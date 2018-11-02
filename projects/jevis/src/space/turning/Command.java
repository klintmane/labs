package space.turning;

import java.util.ArrayList;

public class Command {

    public static String result(ArrayList<String> command, Store store) {
        if (command.size() > 0) {

            String commandId = command.get(0);
            command.remove(0);

            switch (commandId) {
                case "ping":
                    return CommandHandler.ping();
                case "echo":
                    return CommandHandler.echo(command);
                case "exists":
                    return CommandHandler.exists(command, store);
                case "del":
                    return CommandHandler.del(command, store);
                case "set":
                    return CommandHandler.set(command, store);
                case "get":
                    return CommandHandler.get(command, store);
                case "hset":
                    return CommandHandler.hset(command, store);
                case "hget":
                    return CommandHandler.hget(command, store);
                case "hincrby":
                    return CommandHandler.hincrby(command, store);
                case "expire":
                    return CommandHandler.expire(command, store);
                case "keys":
                    return CommandHandler.keys(command, store);
                default:
                    return Response.from("Unknown command: " + commandId, Response.Modifier.MOD_ERR);
            }
        }

        return Response.from("No command provided!");
    }
}
