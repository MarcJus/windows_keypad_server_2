var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import qs from "qs";
import config from "./config.json";
/**
 * @async
 */
function platypus_get_devoirs() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const url = "https://platypus.go.yj.fr/apiEC/devoirs/";
            const identification = {
                "username": config.username,
                "password": config.password
            };
            axios.post(url, qs.stringify(identification)).then(response => {
                const datas = response.data;
                let string_rejected = "";
                datas.forEach((data) => {
                    string_rejected += `Devoir en ${data.matiere} pour le ${data.day}:\n`;
                    string_rejected += `${data.aFaire.contenu}\n\n`;
                });
                resolve(string_rejected);
            }).catch((reason) => {
                reject(reason);
            });
        });
    });
}
function platypus_get_moyenne() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const url = "https://platypus.go.yj.fr/apiEC/moyenne/?periode=A002";
            const identification = {
                "username": config.username,
                "password": config.password
            };
            axios.post(url, qs.stringify(identification)).then(response => {
                const datas = response.data;
                resolve(datas);
            }).catch((reason) => {
                reject(reason);
            });
        });
    });
}
const opera_path = "\"C:\\Users\\jusse\\AppData\\Local\\Programs\\Opera GX\\launcher.exe\"";
const commands = {
    1: "code",
    2: opera_path,
    3: `${opera_path} https://www.ecoledirecte.com`,
    4: "\"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe\" https://www.google.com/",
    5: platypus_get_devoirs,
    6: "wt.exe ssh pi@rspm",
    7: "wt.exe",
    8: platypus_get_moyenne,
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
