import net, {Server} from "net";
import { executeKey } from "./process";
import { Key } from "./commands";

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
        debug_message(data);

        try {
            const command_exec_information = await executeKey((string_data as Key));
            console.log(command_exec_information.message);
            // socket.write("success");
            send_response(socket, "success");
        } catch (e: any) {
            console.error("Erreur!");
            console.log(e.message);
            // socket.write("error");
            send_response(socket, "error");
        }
    });

});

server.listen(port, () => {
    console.log("Serveur démarré sur le port "+port);
});

function debug_message(data: Buffer): void{
    console.log(`valeur hexadecimale : ${Buffer.from(data).toString("hex")}`);
}

type ResponseSocket = "success" | "error";

function send_response(socket: net.Socket, message: ResponseSocket){
    const clientAddress: string | undefined = socket.remoteAddress;
    try {
        socket.write(message, (error: Error | undefined) => {
            if(error){
                console.log(`Impossible d'envoyer ${message} à ${clientAddress} : ${error}`);
            } else {
                console.log(`Message envoyé à ${clientAddress} : ${message}`);
            }
        });
    } catch (error: any) {
        console.log(`Erreur catch : ${error}`);
    }
}