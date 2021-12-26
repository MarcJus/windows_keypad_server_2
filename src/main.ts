import net, {Server} from "net";
import { executeKey, Key } from "./process";

const server: Server = net.createServer();
const port = 3000;

server.on("connection", (socket: net.Socket) => {
    const clientAddress: string | undefined = socket.remoteAddress;
    console.log(`Nouvelle connexion : ${clientAddress}`);
    socket.setEncoding("utf-8");

    // Timeout 10 secondes
    socket.setTimeout(10000, () => {
        socket.write("error");
        console.log(`${clientAddress} : Timeout`);
    });

    // Reception de données
    socket.on("data", async (data: Buffer) => {
        const string_data: string = data.toString("utf-8");
        console.log(`Message de ${clientAddress} : ${string_data}`);

        try {
            const command_exec_information = await executeKey((string_data as Key));
            console.log("command exec information : ",command_exec_information);
        } catch (e) {
            console.log(e);
            socket.write("error");
        }

        // Réponse : succes
        socket.write("success");
    });

});

server.listen(port, () => {
    console.log("Serveur démarré sur le port "+port);
});
