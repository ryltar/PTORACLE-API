export interface IPersonne {
    idPersonne: number;
    nom: string;
    prenom: string;
    dateNaissance: string;
    login: string;
    mdp: string;
}

export class Personne implements IPersonne{
    idPersonne: number;
    nom: string;
    prenom: string;
    dateNaissance: string;
    login: string;
    mdp: string;

    constructor(idPersonne: number, nom: string, prenom: string, dateNaissance: string,
                login: string, mdp: string){
        this.idPersonne = idPersonne;
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.login = login;
        this.mdp = mdp;
    }
}
