var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import net from "net";
import { executeKey } from "./process";
const server = net.createServer();
const port = 3000;
server.on("connection", (socket) => {
    const clientAddress = socket.remoteAddress;
    console.log(`Nouvelle connexion : ${clientAddress}`);
    socket.setEncoding("utf-8");
    // Timeout 10 secondes
    socket.setTimeout(10000, () => {
        socket.write("error");
        console.log(`${clientAddress} : Timeout`);
    });
    // Reception de données
    socket.on("data", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const string_data = data.toString("utf-8");
        console.log(`Message de ${clientAddress} : ${string_data}`);
        try {
            const command_exec_information = yield executeKey(string_data);
            console.log(command_exec_information === null || command_exec_information === void 0 ? void 0 : command_exec_information.message);
            socket.write("success");
        }
        catch (e) {
            socket.write("error");
        }
        console.log(" ");
    }));
});
server.listen(port, () => {
    console.log("Serveur démarré sur le port " + port);
});
