import {Controller, Delete, Get, Post, Put, PathParams, BodyParams} from "@tsed/common";
import {IPersonne, Personne} from "../interfaces/Personne";
import {getExecution, deleteExecution, postExecution, putExecution} from "../database/execute";

@Controller("/personnes")
export class PersonneCtrl {
    /**
     * get all people
     * @return {personnes}
     */
    @Get("/")
    async getAll(): Promise<Array<IPersonne[]>|any> {
        let personnes = await getExecution("SELECT * from Personne", []);
        let data = [];
        if(personnes.length == 0) return 607;
        for (let index in personnes.rows) {
            let personne = new Personne(personnes.rows[index][0],personnes.rows[index][1],personnes.rows[index][2],
            personnes.rows[index][3],personnes.rows[index][4],personnes.rows[index][5]);
            data.push(personne);
        }
        return data;
    }

    /**
     * get one people
     * @param identifiant 
     * @return {personne}
     */
    @Get("/:identifiant")
    async getOne(@PathParams('identifiant') identifiant:string): Promise<IPersonne|any> {
        let personnes = await getExecution("SELECT * from personne" + " WHERE idpersonne = :identifiant ", [identifiant])
        if (personnes.length == 0) return 607
        let personne = new Personne(personnes.rows[0][0], personnes.rows[0][1], personnes.rows[0][2], personnes.rows[0][3], personnes.rows[0][4], personnes.rows[0][5])
        return personne
    }

    /**
     * create one people
     * @param body
     * @return number
     */
    @Post("/")
    async creatOne(@BodyParams() body:any): Promise<number> {
        await postExecution("INSERT INTO personne (nom, prenom, dateNaissance, login, mdp)" + 
                                        " VALUES (:nom, :prenom, to_date(:dateNaissance), :login, :mdp) ",
                                        [body.nom, body.prenom, body.dateNaissance, body.login, body.mdp])
        return 200
    }

    /**
     * Update one people
     * @param identifiant 
     * @param body 
     * @return number
     */
    @Put("/:identifiant")
    async updateOne(@PathParams('identifiant') identifiant:number, @BodyParams() body:IPersonne): Promise<any> {
        var command = "UPDATE personne SET";
        for (var key in body) {
            console.log(`${key} = ${body[key]}`);
            (typeof body[key] === 'string')? command += ` ${key} = '${body[key]}',` : command += ` ${key} = ${body[key]},`;
        }
        command = command.substring(0, command.length-1);
        command += ` WHERE idpersonne = '${identifiant}'`
        await putExecution(command)
        return 200            
    }

    /**
     * Delete one people
     * @param identifiant
     * @return number
     */
    @Delete("/:identifiant")
    async delete(@PathParams('identifiant') identifiant:string): Promise<number> {
    await deleteExecution("DELETE from personne" +
            " WHERE idpersonne = :identifiant", [identifiant])
    return 200
    }
}