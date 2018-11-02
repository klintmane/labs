package space.turning;

import java.util.HashSet;

import static space.turning.ResponseProtocol.*;

public class Response {
    public enum Modifier {
        MOD_BULK,
        MOD_ERR
    }

    public static String fromArr(HashSet<String> subject) {
        String result = "";
        for(String s: subject) {
            result += from(s);
        }
        return line(ARR + subject.size()) + result;
    }

    public static String from(int subject) {
        return line(INT + subject);
    }

    public static String from(String subject) {
        if (subject == null) return line(NIL);
        return line(STRING + subject);
    }

    public static String from(String subject, Modifier mod) {
        if (subject == null) return line(NIL);
        switch (mod) {
            case MOD_BULK:
                return line(BULK + subject.length()) + line(subject);
            case MOD_ERR:
                return line(ERR + subject);
            default:
                return from(subject);
        }
    }

    private static String line(String msg) {
        return msg + CRLF;
    }
}
