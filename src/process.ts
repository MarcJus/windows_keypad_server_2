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

/**
 * * Fonction executée en premier
 * @param key Touche entrée
 * @returns Informations sur le retour de la commande/fonction executée ou null en cas d'erreur
 */
export async function executeKey(key: Key): Promise<CommandExecInformation | null>{
    let result: CommandExecInformation = {
        error: false,
        message: ""
    };
    const command: string | (() => void) = commands[key];
    if(typeof command === "string"){
        result = await executeCommand(command);
    } else {
        (command as () => void)(); // TODO Gérer les erreurs
    }
    return result;
}

/**
 * ! Executée après executeCommand
 * @param command Commande à executer
 * @returns Informations sur le retour de la commande
 */
async function executeCommand(command: string): Promise<CommandExecInformation>{
    console.log("commande :",command);
    return new Promise((resolve, reject) => {
        let command_exec_information: CommandExecInformation = {error: false, message: ""};

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

    });
    
}
