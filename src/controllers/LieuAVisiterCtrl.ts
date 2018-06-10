import {Controller, Delete, Get, Post, Put, PathParams, BodyParams} from "@tsed/common";
import {ILieuAVisiter} from "../interfaces/LieuAVisiter";
import {doExecution} from "../database/execute";
const oracledb = require('oracledb');

@Controller("/lieux")
export class LieuAVisiterCtrl {
    /**
     * get all places to visit
     * 
     * @param request
     * @param response
     * @returns {{id: any, name: string}}
     */
    @Get("/")
    async getAll(): Promise<Array<ILieuAVisiter>|any> {
        let lieux = await doExecution("SELECT * from LieuAVisiter",
            [])
            .then((response) => {
            let temps = [];
            console.log(response);
            for(let index in response.rows){
                let lieu:ILieuAVisiter;
                try {
                    lieu = <ILieuAVisiter> {
                        nomLieu: response.rows[index][0],
                        ville: response.rows[index][1],
                        pays: response.rows[index][2],
                        descriptif: response.rows[index][3],
                        prixVisite: response.rows[index][4]
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
     * @return {lieu}
     */
    @Post("/")
    async creatOne(@BodyParams('nomlieu') nomlieu:string, @BodyParams('ville') ville:string,
                    @BodyParams('pays') pays:string, @BodyParams('descriptif') descriptif:string,
                    @BodyParams('prixvisite') prixvisite:number): Promise<number> {
        let lieu = await doExecution("INSERT INTO lieuavisiter (nomlieu, ville, pays, descriptif, prixvisite)" +
                                        " VALUES (:nomlieu, :ville, :pays, :descriptif, :prixvisite) ", [nomlieu, ville, pays, descriptif, prixvisite])
            .then((response) => {
                return 200
            }, (reject) => {
                return 402
            })
        return lieu
    }

    /**
     * Update a place to visit
     * 
     * @param lieu 
     * @param ville 
     * @param pays 
     * @param body 
     * @return {newLieu}
     */
    @Put("/:lieu/:ville/:pays")
    async updateOne(@PathParams('lieu') lieu:string, @PathParams('ville') ville:string,
                    @PathParams('pays') pays:string, @BodyParams() body:any): Promise<any> {
        console.log(body);
        var command = "UPDATE lieuavisiter SET";
        for (var key in body) {
            console.log(`${key} = ${body[key]}`);
            command += ` ${key} = '${body[key]}',`
        }
        command = command.substring(0, command.length-1);
        command += ` WHERE nomlieu = '${lieu}' AND ville = '${ville}' AND pays = '${pays}'`
        console.log(command);
        let newLieu = await doExecution(command, [])
            .then((response) => {
                return 200
            }, (reject) => {
                return 402
            })
        return newLieu                
    }

    /**
     * Return a specific place to visit
     * 
     * @param lieu 
     * @param ville 
     * @param pays 
     * @returns {lieux}
     */
    @Get("/:lieu/:ville/:pays")
    async getOne(@PathParams('lieu') lieu:string, @PathParams('ville') ville:string,
                 @PathParams('pays') pays:string): Promise<ILieuAVisiter|any> {
        let lieux = await doExecution("SELECT * from LieuAVisiter" +
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
     * Return some places to visit in a specific city
     * 
     * @param ville 
     * @returns {lieux}
     */
    @Get("/ville/:ville")
    async getPerCity(@PathParams('ville') ville:string): Promise<ILieuAVisiter|any> {
        let lieux = await doExecution("SELECT * from LieuAVisiter" +
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
         * Return some places to visit in a specific country
         * 
         * @param pays 
         * @returns {lieux}
         */
        @Get("/pays/:pays")
        async getPerCountry(@PathParams('pays') pays:string): Promise<ILieuAVisiter|any> {
            let lieux = await doExecution("SELECT * from LieuAVisiter" +
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

    /**
     * delete a specific place
     * 
     * @param lieu 
     * @param ville 
     * @param pays 
     * @return {lieux}
     */
    @Delete("/:lieu/:ville/:pays")
    async delete(@PathParams('lieu') lieu:string, @PathParams('ville') ville:string,
                 @PathParams('pays') pays:string): Promise<ILieuAVisiter|any> {
        let lieux = await doExecution("DELETE from LieuAVisiter" +
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