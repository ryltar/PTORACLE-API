export interface IAdministrateur {
    idAdministrateur: number
}

export class Administrateur {
    idAdministrateur: number;


	constructor(idAdministrateur: number) {
        this.idAdministrateur = idAdministrateur;
	}
    
}