import axios from "axios";
import qs from "qs";

/**
 * Fonction qui ne prend aucun paramètre et qui ne retourne rien. C'est le type de fonction dans
 * le fichier commands.ts
 */
export type KeyFunction = (() => void) | (() => Promise<void>);

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

async function key_5(): Promise<any>{
    try{
        const url = "https://platypus.go.yj.fr/apiEC/devoirs/";
        const identification = {
            "username": "MarcJus",
            "password": "Hen12goa"
        };
        const axios_request = await axios.post(url, 
            qs.stringify(identification));
        const datas = axios_request.data;
        datas.forEach((data: any) => {
            console.log("Devoir en "+data.matiere+" pour le "+data.day+":");
            console.log(data.aFaire.contenu);
            console.log("");
        });
    } catch(e){
        console.log("Erreur axios");
        console.log((e as any).response.data);
    }
}

const opera_path =
"\"C:\\Users\\jusse\\AppData\\Local\\Programs\\Opera GX\\launcher.exe\"";

const commands: ListeCommandes = {
    1: "code",
    2: opera_path,
    3: opera_path + " https://www.ecoledirecte.com",
    4: "\"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe\" https://www.google.com/",
    5: key_5,
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