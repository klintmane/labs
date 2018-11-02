package space.turning;

import java.util.ArrayList;

public class CommandHandler {

    public static String ping() {
        return Response.from("PONG");
    }

    public static String echo(ArrayList<String> args) {
        if (validateArgs(args, 1)) {
            String key = args.get(0);
            return Response.from(key, Response.Modifier.MOD_BULK);
        }
        return invalidArgs();
    }

    public static String expire(ArrayList<String> args, Store store) {
        if (validateArgs(args, 2)) {
            String key = args.get(0);
            String val = args.get(1);
            return store.expire(key, val);
        }
        return invalidArgs();
    }

    public static String set(ArrayList<String> args, Store store) {
        if (validateArgs(args, 2)) {
            String key = args.get(0);
            String val = args.get(1);

            if (validateArgs(args, 3)) {
                String mod = args.get(2);
                return store.set(key, val, mod);
            }
            return store.set(key, val);
        }
        return invalidArgs();
    }

    public static String exists(ArrayList<String> args, Store store) {
        if (validateArgs(args, 1)) {
            String key = args.get(0);

            return store.exists(key);
        }
        return invalidArgs();
    }

    public static String get(ArrayList<String> args, Store store) {
        if (validateArgs(args, 1)) {
            String key = args.get(0);

            return store.get(key);
        }
        return invalidArgs();
    }

    public static String del(ArrayList<String> args, Store store) {
        if (validateArgs(args, 1)) {
            int count = 0;

            for (String arg : args) {
                store.del(arg);
                count++;
            }

            return Response.from(count);
        }
        return invalidArgs();
    }

    public static String hget(ArrayList<String> args, Store store) {
        if (validateArgs(args, 2)) {
            String hash = args.get(0);
            String key = args.get(1);

            return store.hget(hash, key);
        }
        return invalidArgs();
    }

    public static String hset(ArrayList<String> args, Store store) {
        if (validateArgs(args, 3)) {
            String hash = args.get(0);
            String key = args.get(1);
            String val = args.get(2);

            return store.hset(hash, key, val);
        }
        return invalidArgs();
    }

    public static String hincrby(ArrayList<String> args, Store store) {
        if (validateArgs(args, 3)) {
            String hash = args.get(0);
            String key = args.get(1);
            String amount = args.get(2);

            return store.hincrby(hash, key, amount);
        }
        return invalidArgs();
    }

    public static String keys(ArrayList<String> args, Store store) {
        if (validateArgs(args, 1)) {
            String pattern = args.get(0);

            return store.keys(pattern);
        }
        return invalidArgs();
    }

    private static String invalidArgs() {
        return Response.from("wrong number of arguments", Response.Modifier.MOD_ERR);
    }

    private static boolean validateArgs(ArrayList<String> args, int until) {
        if (args.size() >= until) {
            boolean valid = true;
            for (int i = 0; i < until; i++) {
                valid = (args.get(i) != null && valid);
            }
            return valid;
        }
        return false;
    }
}
