import {Controller, Delete, Get, Post, Put, PathParams, BodyParams} from "@tsed/common";
import * as Express from "express";
import {IClient, Client} from "../interfaces/Client";
import {Personne} from "../interfaces/Personne";
import {doExecution} from "../database/execute";
const oracledb = require('oracledb');

@Controller('/client')
export class ClientCtrl {

    /**
     * get all clients
     * @returns {clients}
     */
    @Get("/")
    async getAll(): Promise<Array<IClient[]>|any> {
        let tab = [];
        let clients = await doExecution("SELECT * from personne INNER JOIN client ON client.idclient = personne.idpersonne",[])
        if (clients.length == 0) return 607
        for(let index in clients.rows){
            let client = new Personne(clients.rows[0][0], clients.rows[0][1], clients.rows[0][2], clients.rows[0][3], clients.rows[0][4], clients.rows[0][5])
            tab.push(client)
        }
        return tab;
    }

    /**
     * get one client
     * @param identifiant 
     * @return {client}
     */
    @Get("/:identifiant")
    async getOne(@PathParams('identifiant') identifiant:string): Promise<IClient|any> {
        let clients = await doExecution("SELECT * from personne INNER JOIN client ON client.idclient = personne.idpersonne WHERE idclient = :identifiant ", [identifiant])
        if (clients.length == 0) return 607
        let client = new Personne(clients.rows[0][0], clients.rows[0][1], clients.rows[0][2], clients.rows[0][3], clients.rows[0][4], clients.rows[0][5])
        return client
    }

    /**
     * create one client
     * @param body 
     * @returns number
     */
    @Post("/")
    async creatOne(@BodyParams() body:any): Promise<number> {
        await doExecution("INSERT INTO client (idclient) VALUES (:idclient) ", [body.idclient])
        return 200
    }

    /**
     * delete one client
     * @param identifiant 
     * @return number
     */
    @Delete("/:identifiant")
    async delete(@PathParams('identifiant') identifiant:string): Promise<number> {
        await doExecution("DELETE from client WHERE idclient = :identifiant", [identifiant])
        return 200
    }
}