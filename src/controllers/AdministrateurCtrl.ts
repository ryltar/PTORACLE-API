import {Controller, Delete, Get, Post, Put, PathParams, BodyParams} from "@tsed/common";
import * as Express from "express";
import {IAdministrateur, Administrateur} from "../interfaces/Administrateur";
import {Personne} from "../interfaces/Personne";
import {doExecution} from "../database/execute";
const oracledb = require('oracledb');

@Controller('/admin')
export class AdministrateurCtrl {

    /**
     * get all admins
     */
    @Get("/")
    async getAll(): Promise<Array<IAdministrateur[]>|any> {
        let tab = [];
        let admins = await doExecution("SELECT * from personne INNER JOIN administrateur ON administrateur.idadministrateur = personne.idpersonne",[])
        if (admins.length == 0) return 607
        for(let index in admins.rows){
            let admin = new Personne(admins.rows[0][0], admins.rows[0][1], admins.rows[0][2], admins.rows[0][3], admins.rows[0][4], admins.rows[0][5])
            tab.push(admin)
        }
        return tab;
    }

    /**
     * get one admin
     * @param identifiant
     * @return {admin}
     */
    @Get("/:identifiant")
    async getOne(@PathParams('identifiant') identifiant:string): Promise<IAdministrateur|any> {
        let admins = await doExecution("SELECT * from personne INNER JOIN administrateur ON administrateur.idadministrateur = personne.idpersonne WHERE idadministrateur = :identifiant ", [identifiant])
        if (admins.length == 0) return 607
        let admin = new Personne(admins.rows[0][0], admins.rows[0][1], admins.rows[0][2], admins.rows[0][3], admins.rows[0][4], admins.rows[0][5])
        return admin
    }

    /**
     * Create one admin
     * @param body 
     * @return 
     */
    @Post("/")
    async creatOne(@BodyParams() body:any): Promise<number> {
        await doExecution("INSERT INTO administrateur (idadministrateur) VALUES (:idadministrateur) ", [body.idadministrateur])
        return 200
    }

    /**
     * Delete one admin
     * @param identifiant
     * @return number
     */
    @Delete("/:identifiant")
    async delete(@PathParams('identifiant') identifiant:string): Promise<number> {
        await doExecution("DELETE from administrateur WHERE idadministrateur = :identifiant", [identifiant])
        return 200
    }
}
