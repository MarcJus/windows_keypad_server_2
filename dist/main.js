var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { executeKey } from "./process";
import config from "./config.json";
import express from "express";
const app = express();
const port = config.port;
app.get("/key/:key", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const key = request.params.key;
    console.log(`Key : ${key}`);
    try {
        const command_exec_information = yield executeKey(key);
        console.log(command_exec_information.message);
        response.send(command_exec_information.message);
    }
    catch (e) {
        console.error("Erreur!");
        console.log(e.message);
        response.status(500).send(e.message + "\n");
    }
}));
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
