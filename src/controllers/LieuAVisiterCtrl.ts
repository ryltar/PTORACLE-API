import {Controller, Delete, Get, PathParams} from "@tsed/common";
import * as Express from "express";
import {ILieuAVisiter} from "../interfaces/LieuAVisiter";
import {onlyOneExecution} from "../database/execute";
const oracledb = require('oracledb');

@Controller("/lieux")
export class LieuAVisiterCtrl {
    /**
     * Example of classic call. Use `@Get` for routing a request to your method.
     * In this case, this route "/calendars/:id" are mounted on the "rest/" path.
     *
     * By default, the response is sent with status 200 and is serialized in JSON.
     *
     * @param request
     * @param response
     * @returns {{id: any, name: string}}
     */
    @Get("/")
    async getAll(request: Express.Request,
                 response: Express.Response): Promise<Array<ILieuAVisiter>|any> {
        let lieux = await onlyOneExecution("SELECT * from LieuAVisiter",
            null)
            .then((response) => {
            let temps = [];
            for(let index in response){
                let lieu:ILieuAVisiter;
                try {
                    lieu = <ILieuAVisiter> {
                        nomLieu: response[index][0],
                        ville: response[index][1],
                        pays: response[index][2],
                        descriptif: response[index][3],
                        prixVisite: response[index][4]
                    };
                    temps.push(lieu);
                }
                catch(error){
                    return {error:'Il n\'y a aucun lieu dans la base de données'}
                }
            }
            return temps;
        });
        return lieux;
    }

    @Get("/:lieu/:ville/:pays")
    async getOne(@PathParams('lieu') lieu:string, @PathParams('ville') ville:string,
                 @PathParams('pays') pays:string): Promise<ILieuAVisiter|any> {
        let lieux = await onlyOneExecution("SELECT * from LieuAVisiter" +
            " WHERE nomLieu = :lieu AND ville = :ville AND pays = :pays ",
            [lieu,ville,pays])
            .then((response) => {
                let lieu:ILieuAVisiter = <ILieuAVisiter>{};
                if(response.rows.size() > 0){
                    lieu = <ILieuAVisiter> {
                        nomLieu: response.rows[0][0],
                        ville: response.rows[0][1],
                        pays: response.rows[0][2],
                        descriptif: response.rows[0][3],
                        prixVisite: response.rows[0][4]
                    };
                    return lieu;
                }else{
                    return {error:'le lieu n\'existe pas'};
                }
        },(error) =>{
                console.error(error);
                return {error:error};
            });
        return lieux;
    }

    @Delete("/:lieu/:ville/:pays")
    async delete(@PathParams('lieu') lieu:string, @PathParams('ville') ville:string,
                 @PathParams('pays') pays:string): Promise<ILieuAVisiter|any> {
        let lieux = await onlyOneExecution("DELETE from LieuAVisiter" +
            " WHERE nomLieu = :lieu AND ville = :ville AND pays = :pays",
            [lieu,ville,pays])
            .then((response) => {
                if(response.rowsAffected == 1){
                    return {response : 'le lieu à bien été supprimé'};
                }else{
                    return {error : 'le lieu n\'existe pas'};
                }
            }, (error) => {
                console.error(error);
                return {error:error};
            });
        return lieux;
    }

}