var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import net, {Server} from "net";
import { executeKey } from "./process";
import config from "./config.json";
import express from "express";
// const server: Server = net.createServer();
const app = express();
const port = config.port;
app.get("/key/:key", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const key = request.params.key;
    try {
        const command_exec_information = yield executeKey(key);
        console.log(command_exec_information.message);
        response.send(command_exec_information.message);
    }
    catch (e) {
        console.error("Erreur!");
        console.log(e.message);
        response.send(e.message);
    }
}));
// server.on("connection", (socket: net.Socket) => {
//     const clientAddress: string | undefined = socket.remoteAddress;
//     console.log(`Nouvelle connexion : ${clientAddress}`);
//     socket.setEncoding("utf-8");
//     // Timeout 10 secondes
//     socket.setTimeout(config.timeout, () => {
//         socket.write("error");
//         console.log(`${clientAddress} : Timeout`);
//     });
//     // Reception de données
//     socket.on("data", async (data: Buffer) => {
//         const string_data: string = data.toString("utf-8");
//         console.log(`Message de ${clientAddress} : ${string_data}`);
// try {
//     const command_exec_information = await executeKey((string_data as Key));
//     console.log(command_exec_information.message);
//     send_response(socket, "success");
// } catch (e: any) {
//     console.error("Erreur!");
//     console.log(e.message);
//     send_response(socket, "error");
// }
//     });
// });
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
// server.listen(port, () => {
//     console.log("Serveur démarré sur le port "+port);
// });
// type ResponseSocket = "success" | "error";
// function send_response(socket: net.Socket, message: ResponseSocket): void{
//     const clientAddress: string | undefined = socket.remoteAddress;
//     if(!socket.destroyed){
//         socket.write(message, (error: Error | undefined) => {
//             if(error){
//                 console.log(`Impossible d'envoyer ${message} à ${clientAddress} : ${error}`);
//             } else {
//                 console.log(`Message envoyé à ${clientAddress} : ${message}`);
//             }
//         });
//     } else {
//         console.log(
//             `Impossible d'envoyer ${message} à ${clientAddress} : la connexion est terminée`);
//     }
// }
