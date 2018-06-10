import {Controller, Delete, Get, Post, Put, PathParams, BodyParams} from "@tsed/common";
import {IPassager, Passager} from "../interfaces/Passager";
import {Personne} from "../interfaces/Personne";
import {doExecution} from "../database/execute";
const oracledb = require('oracledb');

@Controller('/passengers')
export class AdministrateurCtrl {

    /**
     * get all passengers
     */
    @Get("/")
    async getAll(): Promise<Array<IPassager[]>|any> {
        let tab = [];
        let passengers = await doExecution("SELECT * from personne INNER JOIN passager ON passager.idpassager = personne.idpersonne",[])
        if (passengers.length == 0) return 607
        for(let index in passengers.rows){
            let passenger = new Personne(passengers.rows[0][0], passengers.rows[0][1], passengers.rows[0][2], passengers.rows[0][3], passengers.rows[0][4], passengers.rows[0][5])
            tab.push(passenger)
        }
        return tab;
    }

    /**
     * get one passenger
     * @param identifiant
     * @return {passenger}
     */
    @Get("/:identifiant")
    async getOne(@PathParams('identifiant') identifiant:string): Promise<IPassager|any> {
        let passengers = await doExecution("SELECT * from personne INNER JOIN passager ON passager.idpassager = personne.idpersonne WHERE idpassager = :identifiant ", [identifiant])
        if (passengers.length == 0) return 607
        let passenger = new Personne(passengers.rows[0][0], passengers.rows[0][1], passengers.rows[0][2], passengers.rows[0][3], passengers.rows[0][4], passengers.rows[0][5])
        return passenger
    }

    /**
     * Create one passenger
     * @param body
     * @return
     */
    @Post("/")
    async creatOne(@BodyParams() body:any): Promise<number> {
        await doExecution("INSERT INTO passager (idpassager) VALUES (:idpassager) ", [body.idpassager])
        return 200
    }

    /**
     * Delete one passenger
     * @param identifiant
     * @return number
     */
    @Delete("/:identifiant")
    async delete(@PathParams('identifiant') identifiant:string): Promise<number> {
        await doExecution("DELETE from passager WHERE idpassager = :identifiant", [identifiant])
        return 200
    }
}
