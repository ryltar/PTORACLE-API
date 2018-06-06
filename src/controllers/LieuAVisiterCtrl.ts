import {Controller, Delete, Get, Post, PathParams, BodyParams} from "@tsed/common";
import * as Express from "express";
import {ILieuAVisiter} from "../interfaces/LieuAVisiter";
import {getExecution, deleteExecution, postExecution} from "../database/execute";
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
    async getAll(): Promise<Array<ILieuAVisiter>|any> {
        let lieux = await getExecution("SELECT * from LieuAVisiter",
            null)
            .then((response) => {
            let temps = [];
            console.log(response);
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
    
    /**
     * Create a place to visit
     * 
     * @param nomlieu 
     * @param ville 
     * @param pays 
     * @param descriptif 
     * @param prixvisite
     * @return {success}
     */
    @Post("/")
    async creatOne(@BodyParams('nomlieu') nomlieu:string, @BodyParams('ville') ville:string,
                    @BodyParams('pays') pays:string, @BodyParams('descriptif') descriptif:string,
                    @BodyParams('prixvisite') prixvisite:number): Promise<any> {
        let lieu = await postExecution("INSERT INTO lieuavisiter (nomlieu, ville, pays, descriptif, prixvisite)" + 
                                        " VALUES (:nomlieu, :ville, :pays, :descriptif, :prixvisite) ", [nomlieu, ville, pays, descriptif, prixvisite])
            .then((response) => {
                return {success: true}
            }, (reject) => {
                return {success: false}
            })
        return lieu
    }

    /**
     * Return a specific place
     * 
     * @param lieu 
     * @param ville 
     * @param pays 
     * @returns {lieux}
     */
    @Get("/:lieu/:ville/:pays")
    async getOne(@PathParams('lieu') lieu:string, @PathParams('ville') ville:string,
                 @PathParams('pays') pays:string): Promise<ILieuAVisiter|any> {
        let lieux = await getExecution("SELECT * from LieuAVisiter" +
            " WHERE nomLieu = :lieu AND ville = :ville AND pays = :pays ",
            [lieu,ville,pays])
            .then((response) => {
                let lieu:ILieuAVisiter = <ILieuAVisiter>{};
                if(response.rows.length > 0){
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

    /**
     * Return some places in a specific city
     * 
     * @param ville 
     * @returns {lieux}
     */
    @Get("/ville/:ville")
    async getPerCity(@PathParams('ville') ville:string): Promise<ILieuAVisiter|any> {
        let lieux = await getExecution("SELECT * from LieuAVisiter" +
            " WHERE ville = :ville ", [ville])
            .then((response) => {
                let temps = [];
                for (let index in response) {
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
                    catch {
                        return {error:'Il n\'y a aucun lieu dans cette ville'};
                    }
                }
                return temps;
            });
            return lieux;
        }

        /**
         * Return some places in a specific country
         * 
         * @param pays 
         * @returns {lieux}
         */
        @Get("/pays/:pays")
        async getPerCountry(@PathParams('pays') pays:string): Promise<ILieuAVisiter|any> {
            let lieux = await getExecution("SELECT * from LieuAVisiter" +
                " WHERE pays = :pays ", [pays])
                .then((response) => {
                    let temps = [];
                    for (let index in response) {
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
                        catch {
                            return {error:'Il n\'y a aucun lieu dans ce pays'};
                        }
                    }
                    return temps;
                });
                return lieux;
            }

    @Delete("/:lieu/:ville/:pays")
    async delete(@PathParams('lieu') lieu:string, @PathParams('ville') ville:string,
                 @PathParams('pays') pays:string): Promise<ILieuAVisiter|any> {
        let lieux = await deleteExecution("DELETE from LieuAVisiter" +
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