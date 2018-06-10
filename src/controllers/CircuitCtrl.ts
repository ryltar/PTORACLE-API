import {Controller, Delete, Get, Post, Put, PathParams, BodyParams} from "@tsed/common";
import * as Express from "express";
import {ICircuit, Circuit} from "../interfaces/Circuit";
import {doExecution} from "../database/execute";
const oracledb = require('oracledb');

@Controller('/circuit')
export class CircuitCtrl {

    /**
     * get all circuits
     */
    @Get("/")
    async getAll(): Promise<Array<ICircuit[]>|any> {
        let tab = [];
        let circuits = await doExecution("SELECT * from Circuit",[])
        if (circuits.length == 0) return 607
        for(let index in circuits.rows){
            let circuit = new Circuit(circuits.rows[index][0], circuits.rows[index][1], circuits.rows[index][2], circuits.rows[index][3], circuits.rows[index][4],
                                    circuits.rows[index][5], circuits.rows[index][6], circuits.rows[index][7], circuits.rows[index][8], circuits.rows[index][9], circuits.rows[index][10])
            tab.push(circuit)
        }
        return tab;
    }

    /**
     * get one circuit
     * @param identifiant 
     */
    @Get("/:identifiant")
    async getOne(@PathParams('identifiant') identifiant:string): Promise<ICircuit|any> {
        let circuits = await doExecution("SELECT * from Circuit" + " WHERE identifiantcircuit = :identifiant ", [identifiant])
        if (circuits.length == 0) return 607
        let circuit = new Circuit(circuits.rows[0][0], circuits.rows[0][1], circuits.rows[0][2], circuits.rows[0][3], circuits.rows[0][4], circuits.rows[0][5],
            circuits.rows[0][6], circuits.rows[0][7], circuits.rows[0][8], circuits.rows[0][9], circuits.rows[0][10])
        return circuit
    }

    /**
     * create one circuit
     * @param body
     * @return number
     */
    @Post("/")
    async creatOne(@BodyParams() body:any): Promise<number> {
        await doExecution("INSERT INTO circuit (descriptif, villedepart, paysdepart, villearrivee, paysarrivee, datedepart, nbrplacedispo, duree, prixinscription, titre)" +
                                        " VALUES (:descriptif, :villedepart, :paysdepart, :villearrivee, :paysarrivee, to_date(:datedepart), :nbrplacedispo, :duree, :prixinscription, :titre) ",
                                        [body.descriptif, body.villedepart, body.paysdepart, body.villearrivee, body.paysarrivee, body.datedepart, body.nbrplacedispo, body.duree, body.prixinscription, body.titre])
        return 200
    }

    /**
     * update one circuit
     * @param identifiant 
     * @param body 
     */
    @Put("/:identifiant")
    async updateOne(@PathParams('identifiant') identifiant:number, @BodyParams() body:ICircuit): Promise<any> {
        console.log(body);
        var command = "UPDATE circuit SET";
        for (var key in body) {
            console.log(`${key} = ${body[key]}`);
            (typeof body[key] === 'string')? command += ` ${key} = '${body[key]}',` : command += ` ${key} = ${body[key]},`;
        }
        command = command.substring(0, command.length-1);
        command += ` WHERE identifiantcircuit = '${identifiant}'`
        console.log(command);
        await doExecution(command, [])
        return 200            
    }

    /**
     * delete one circuit
     * @param identifiant 
     */
    @Delete("/:identifiant")
    async delete(@PathParams('identifiant') identifiant:string): Promise<number> {
        let lieux = await doExecution("DELETE from Circuit" +
            " WHERE identifiantcircuit = :identifiant",
            [identifiant])
        return 200
    }


}