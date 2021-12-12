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
                console.log(e);
            }
        }
        else {
            command();
        }
        return result;
    });
}
function executeCommand(command) {
    return __awaiter(this, void 0, void 0, function* () {
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
                console.log("catch");
                reject(e);
            }
            resolve(command_exec_information);
        });
    });
}
