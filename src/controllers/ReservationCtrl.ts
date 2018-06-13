import {Controller, Delete, Get, Post, Put, PathParams, BodyParams} from "@tsed/common";
import {IReservation, Reservation} from "../interfaces/Reservation";
import {doExecution} from "../database/execute";

@Controller('/reservation')
export class ReservationCtrl {

    /**
     * get all reservations
     * @return {reservations}
     */
    @Get("/")
    async getAll(): Promise<Array<IReservation[]>|any> {
        let reservations = await doExecution("SELECT * from reservation", []);
        let data = [];
        if(reservations.length == 0) return 607;
        for (let index in reservations.rows) {
            let reservation = new Reservation(reservations.rows[index][0],reservations.rows[index][1],reservations.rows[index][2],
                reservations.rows[index][3],reservations.rows[index][4]);
            data.push(reservation);
        }
        return data;
    }


    /**
     * get one reservation
     * @param identifiant
     * @return {reservation}
     */
    @Get("/:identifiant")
    async getOne(@PathParams('identifiant') identifiant:string): Promise<IReservation|any> {
        let reservations = await doExecution("SELECT * from reservation WHERE idreservation = :identifiant ", [identifiant])
        if (reservations.length == 0) return 607
        let reservation = new Reservation(reservations.rows[0][0], reservations.rows[0][1], reservations.rows[0][2], reservations.rows[0][3], reservations.rows[0][4])
        return reservation
    }

    /**
     * create one reservation
     * @param body 
     * @return number
     */
    @Post("/")
    async creatOne(@BodyParams() body:any): Promise<number> {
        await doExecution("INSERT INTO reservation (idreservation, datereservation, nbrplacesreservees, valide, idclient, identifiantcircuit)" +
                                        " VALUES (:idreservation, to_date(:datereservation), :nbrplacesreservees, :valide, :idclient, :identifiantcircuit) ",
                                        [body.idreservation, body.datereservation, body.nbrplacesreservees, body.valide, body.idclient, body.identifiantcircuit])
        return 200
    }

    /**
     * update one reservation
     * @param identifiant 
     * @param body 
     * @return number
     */
    @Put("/:identifiant")
    async updateOne(@PathParams('identifiant') identifiant:number, @BodyParams() body:IReservation): Promise<any> {
        var command = "UPDATE reservation SET";
        for (var key in body) {
            console.log(`${key} = ${body[key]}`);
            (typeof body[key] === 'string')? command += ` ${key} = '${body[key]}',` : command += ` ${key} = ${body[key]},`;
        }
        command = command.substring(0, command.length-1);
        command += ` WHERE idreservation = '${identifiant}'`
        await doExecution(command, [])
        return 200            
    }

    /**
     * delete one reservation
     * @param identifiant 
     * @return number
     */
    @Delete("/:identifiant")
    async delete(@PathParams('identifiant') identifiant:string): Promise<number> {
    await doExecution("DELETE from reservation" +
            " WHERE idreservation = :identifiant", [identifiant])
    return 200
    }
}