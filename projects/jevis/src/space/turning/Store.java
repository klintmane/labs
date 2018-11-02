package space.turning;

import java.util.HashMap;
import java.util.HashSet;

public class Store {
    private HashMap<String, String> data;
    private HashMap<String, HashMap<String, String>> hdata;
    private HashMap<String, String> expires;

    Store() {
        this.init();
    }

    private void init() {
        this.data = new HashMap<>();
        this.hdata = new HashMap<>();
        this.expires = new HashMap<>();
    }

    public String expire(String key, String val) {
        if (this.data.get(key) != null || this.hdata.get(key) != null) {
            long time = System.currentTimeMillis() + Integer.parseInt(val) * 1000;
            this.expires.put(key, Long.toString(time));
            return Response.from(1);
        }

        return Response.from(0);
    }

    public String exists(String key) {
        boolean result = this.data.get(key) != null || this.hdata.get(key) != null;
        return Response.from(result ? 1 : 0);
    }

    public String get(String key) {
        delIfExpired(key);
        return Response.from(this.data.get(key), Response.Modifier.MOD_BULK);
    }

    public String set(String key, String val, String mod) {
        if (validateSetModifier(mod, this.data.get(key) != null)) {
            this.data.put(key, val);
            return Response.from("OK");
        }
        return Response.from(null);
    }

    public String set(String key, String val) {
        this.data.put(key, val);
        return Response.from("OK");
    }

    public void del(String key) {
        this.expires.remove(key);
        this.data.remove(key);
        this.hdata.remove(key);
    }

    public String hget(String hash, String key) {
        delIfExpired(key);
        HashMap<String, String> kv = hdata.get(hash);
        if (kv != null) {
            return Response.from(kv.get(key), Response.Modifier.MOD_BULK);
        }
        return Response.from(null);
    }

    public String hset(String hash, String key, String val) {
        boolean updated = this.hdata.get(hash) != null && this.hdata.get(hash).get(key) != null;
        this.hdata.put(hash, new HashMap<>() {{
            put(key, val);
        }});
        return Response.from(updated ? 0 : 1);
    }

    public String hincrby(String hash, String key, String amount) {
        delIfExpired(hash);
        if (this.hdata.get(hash) != null) {
            int amt = Integer.parseInt(amount);
            int val = Integer.parseInt(this.hdata.get(hash).get(key));
            String result = Integer.toString(amt + val);

            return hset(hash, key, result);
        }
        return Response.from(null);
    }

    public String keys(String pattern) {
        HashSet<String> set = new HashSet<>();
        set.addAll(this.hdata.keySet());
        set.addAll(this.data.keySet());

        return Response.fromArr(set);
    }

    private void delIfExpired(String key) {
        String exp = this.expires.get(key);

        if (exp != null) {
            Long expiration = Long.parseLong(exp);
            Long current = System.currentTimeMillis();

            if (Long.compare(current, expiration) >= 0) {
                del(key);
            }
        }
    }

    private static boolean validateSetModifier(String mod, boolean exists) {
        boolean nx = mod.equals("NX");
        boolean xx = mod.equals("XX");

        return (!nx && !xx) || (nx && !exists) || (xx && exists);
    }
}
