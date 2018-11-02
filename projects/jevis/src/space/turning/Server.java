package space.turning;

import java.io.*;
import java.net.*;
import java.util.ArrayList;

public class Server {
    private ServerSocket server;
    private int port;
    private Store store;
    private ArrayList<String> command;

    Server(int port) {
        this.port = port;
    }

    public void listen() throws IOException {
        server = new ServerSocket(this.port);
        store = new Store();
        System.out.println("Jevis server listening on port " + this.port);
        while (true) {
            Socket conn = server.accept();
            this.handleClient(conn);
        }
    }

    private void handleClient(Socket conn) throws IOException {
        BufferedReader input = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        DataOutputStream output = new DataOutputStream(conn.getOutputStream());

        String line;
        int lineNumber = 0;
        int numArgs = 0;

        command = new ArrayList<>();

        while ((line = input.readLine()) != null) {
            if (lineNumber == 0) {
                if (!isArgCount(line)) {
                    output.writeBytes(Response.from("Protocol not supported.", Response.Modifier.MOD_ERR));
                    conn.close();
                    return;
                }
                numArgs = getArgCount(line);
            }

            if (isArg(line)) command.add(line);
            if (isEnd(lineNumber, numArgs)) break;

            lineNumber++;
        }

        output.writeBytes(Command.result(command, store));
        conn.close();
    }

    private boolean isArgCount(String line) {
        return line.charAt(0) == '*';
    }

    private int getArgCount(String line) {
        return Integer.parseInt(line.substring(1));
    }

    private boolean isArg(String line) {
        char firstChar = line.charAt(0);
        return firstChar != '$' && firstChar != '*';
    }

    private boolean isEnd(int line, int argCount) {
        return line >= argCount * 2;
    }
}
