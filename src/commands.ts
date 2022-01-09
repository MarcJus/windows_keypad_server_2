import axios from "axios";
import qs from "qs";
import config from "./config.json";

/**
 * Fonction qui ne prend aucun paramètre et qui ne retourne rien. C'est le type de fonction dans
 * le fichier commands.ts
 */
export type KeyFunction = (() => string) | (() => Promise<string>);

/**
 * Touches sur le keypad
 */
export type Key = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0"
                 | "A" | "B" |"C" | "D" | "*" | "#";

/**
 * Type pour la liste des commandes : cette liste accepte un ```Key``` en clé et une commande ou
 * une fonction en valeur
 */                 
type ListeCommandes = {
    [Cle in Key]: string | KeyFunction
};

/**
 * @async
 */
async function platypus_get_devoirs(): Promise<string>{
    return new Promise((resolve, reject) => {
        const url = "https://platypus.go.yj.fr/apiEC/devoirs/";
        const identification = {
            "username": config.username,
            "password": config.password
        };
        axios.post(url, 
            qs.stringify(identification)).then(response => {
                const datas = response.data;
                let string_rejected = "";
                datas.forEach((data: any) => {
                    string_rejected += `Devoir en ${data.matiere} pour le ${data.day}:\n`;
                    string_rejected += `${data.aFaire.contenu}\n\n`;
                });
                resolve(string_rejected);
            }).catch((reason: any) => {
                reject(reason);
            });
    });
}

async function platypus_get_moyenne(): Promise<string>{
    return new Promise((resolve, reject) => {

    });
}

const opera_path =
"\"C:\\Users\\jusse\\AppData\\Local\\Programs\\Opera GX\\launcher.exe\"";

const commands: ListeCommandes = {
    1: "code",
    2: opera_path,
    3: `${opera_path} https://www.ecoledirecte.com`,
    4: "\"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe\" https://www.google.com/",
    5: platypus_get_devoirs,
    6: "wt.exe ssh pi@rspm",
    7: "wt.exe",
    8: "",
    9: "\"C:\\Users\\jusse\\AppData\\Local\\Postman\\Postman.exe\"",
    "*": "ipconfige",
    0: "ipconfig",
    "#": "ifconfige",
    A: "ipconfig",
    B: "ipconfig",
    C: "ipconfig",
    D: "ipconfig",
};

export default commands;
