import {Controller, Delete, Get, Post, Put, PathParams, BodyParams} from "@tsed/common";
import {IPersonne, Personne} from "../interfaces/Personne";
import {getExecution, deleteExecution, postExecution, putExecution} from "../database/execute";

@Controller("/personnes")
export class PersonneCtrl {
    /**
     * get all people
     *
     */
    @Get("/")
    async getAll(): Promise<Array<IPersonne[]>|any> {
        let personnes = await getExecution("SELECT * from Personne",
            []);
        let data = [];
        if(personnes.length == 0) return 607;
        for (let index in personnes.rows) {
            let personne = new Personne(personnes.rows[index][0],personnes.rows[index][1],personnes.rows[index][2],
            personnes.rows[index][3],personnes.rows[index][4],personnes.rows[index][5]);
            data.push(personne);
        }
        return data;
    }
}