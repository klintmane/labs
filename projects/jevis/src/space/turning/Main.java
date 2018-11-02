package space.turning;

import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        Server srv = new Server(6379);
        try {
            srv.listen();
        } catch (IOException e) {
            System.out.println("An error occurred. The Jevis server could not be started.");
        }
    }
}
