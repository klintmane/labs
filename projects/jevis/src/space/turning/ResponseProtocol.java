package space.turning;

public class ResponseProtocol {
    static final String STRING = "+";
    static final String BULK = "$";
    static final String ERR = "-";

    static final String CRLF = "\r\n";

    static final String INT = ":";
    static final String ARR = "*";

    static final String NIL = BULK + "-1";
}
