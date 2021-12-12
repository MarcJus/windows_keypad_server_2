import { exec, ExecException } from "child_process";
import commands from "./commands";

export type Key = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
                 | "A" | "B" |"C" | "D" | "*" | "#";

/**
 * Informations sur la commande executée
 */                 
interface CommandExecInformation {
    /**
     * `true` si `exec()` a retourné une erreur ou un stderr
     */
    error: boolean,

    /**
     * Retourne le message stdout ou stderr en cas d'erreur
     */
    message: string

}

export async function executeKey(key: Key): Promise<CommandExecInformation | null>{
    let result: CommandExecInformation = {
        error: false,
        message: ""
    };
    const command: string | (() => void) = commands[key];
    if(typeof command === "string"){
        try{
            result = await executeCommand(command);
        } catch (e) {
            console.log(e);
        }
    } else {
        (command as () => void)();
    }

    return result;
}

async function executeCommand(command: string): Promise<CommandExecInformation>{
    return new Promise((resolve, reject) => {
        let command_exec_information: CommandExecInformation = {error: false, message: ""};

        try{
            exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
                if(error != null){
                    command_exec_information = {
                        error: true,
                        message: error.message
                    };
                    reject(error);
                }
                if(stderr !== ""){
                    command_exec_information = {
                        error: true,
                        message: stderr
                    };
                } else {
                    command_exec_information = {
                        error: false,
                        message: stdout
                    };
                }
                resolve(command_exec_information);
            });
        } catch (e) {
            console.log("catch");
            reject(e);
        }
        resolve(command_exec_information);
    });
    
}
