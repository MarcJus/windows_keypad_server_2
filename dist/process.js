var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { exec } from "child_process";
import commands from "./commands";
/**
 * * Fonction executée en premier
 * @param key Touche entrée
 * @returns Informations sur le retour de la commande/fonction executée ou null en cas d'erreur
 */
export function executeKey(key) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = {
            error: false,
            message: ""
        };
        const command = commands[key];
        if (typeof command === "string") {
            try {
                result = yield executeCommand(command);
            }
            catch (e) {
                console.log("error executeKey");
            }
        }
        else {
            yield executeFunction(command);
        }
        return result;
    });
}
/**
 * ! Executée après executeCommand
 * @param command Commande à executer
 * @returns Informations sur le retour de la commande
 */
function executeCommand(command) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(command);
        return new Promise((resolve, reject) => {
            let command_exec_information = { error: false, message: "" };
            try {
                exec(command, (error, stdout, stderr) => {
                    if (error != null) {
                        command_exec_information = {
                            error: true,
                            message: error.message
                        };
                        reject(error);
                    }
                    if (stderr !== "") {
                        command_exec_information = {
                            error: true,
                            message: stderr
                        };
                    }
                    else {
                        command_exec_information = {
                            error: false,
                            message: stdout
                        };
                    }
                    resolve(command_exec_information);
                });
            }
            catch (e) {
                reject(e);
            }
            resolve(command_exec_information);
        });
    });
}
/**
 * Execute la fonction attribuée à chaque bouton
 * @param func Fonction à executer
 */
function executeFunction(func) {
    return __awaiter(this, void 0, void 0, function* () {
        const resultat = yield func();
        console.log(resultat);
    });
}
