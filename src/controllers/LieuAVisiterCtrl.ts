import {Controller, Get} from "@tsed/common";
import * as Express from "express";
import {ILieuAVisiter} from "../interfaces/LieuAVisiter";
import {onlyOneExecution} from "../database/execute";

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
    async get(request: Express.Request, response: Express.Response): Promise<Array<ILieuAVisiter>> {
        let lieux = await onlyOneExecution("SELECT * from LieuAVisiter", null).then((response) => {
            let temps = [];
            for(let index in response){
                const lieu : ILieuAVisiter = <ILieuAVisiter> {
                    nomLieu: response[index][0],
                    ville: response[index][1],
                    pays: response[index][2],
                    descriptif: response[index][3],
                    prixVisite: response[index][4]

                };
                temps.push(lieu);
            }
            return temps;
        });

        return lieux;
    }
}