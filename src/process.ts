import { exec, ExecException } from "child_process";
import commands from "./commands";
import { Key, KeyFunction } from "./commands";

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
    const command: string | KeyFunction = commands[key];
    if(typeof command === "string"){
        result = await executeCommand(command);
    } else {
        await executeFunction(command);
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

/**
 * Execute la fonction attribuée à chaque bouton
 * @param func Fonction à executer
 */
async function executeFunction(func: KeyFunction): Promise<void> {
    const resultat: string = await func();
    console.log(resultat);
}
