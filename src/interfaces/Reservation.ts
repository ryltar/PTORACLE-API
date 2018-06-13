export interface IReservation {
    idReservation: number,
    dateReservation: Date,
    nbrPlacesReservees: number,
    valide: number,
    identidiantCircuit: number
}

export class Reservation implements IReservation {
    idReservation: number;
    dateReservation: Date;
    nbrPlacesReservees: number;
    valide: number;
    identidiantCircuit: number;

    constructor(idReservation: number, dateReservation: Date,  nbrPlacesReservees: number, valide: number, identidiantCircuit: number) {
        this.idReservation = idReservation;
        this.dateReservation = dateReservation;
        this.nbrPlacesReservees = nbrPlacesReservees;
        this.valide = valide;
        this.identidiantCircuit = identidiantCircuit;
    }
}