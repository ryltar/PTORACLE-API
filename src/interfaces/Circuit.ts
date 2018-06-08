export interface ICircuit {
    identifiantCircuit: number,
    descriptif: string,
    villedepart: string,
    paysdepart: string,
    villearrivee: string,
    paysarrivee: string,
    datedepart: Date,
    nbrplacedispo: number,
    duree: number,
    prixinscription: number,
    titre: string
}

export class Circuit {
    identifiantCircuit: number;
    descriptif: string;
    villedepart: string;
    paysdepart: string;
    villearrivee: string;
    paysarrivee: string;
    datedepart: string;
    nbrplacedispo: number;
    duree: number;
    prixinscription: number;
    titre: string;

    constructor(identifiantCircuit: number, titre: string, descriptif: string, villedepart: string, paysdepart: string, villearrivee: string, paysarrivee: string, datedepart: string, nbrplacedispo: number, duree: number, prixinscription: number) {
        this.identifiantCircuit = identifiantCircuit;
        this.titre = titre;
        this.descriptif = descriptif;
        this.villedepart = villedepart;
        this.paysdepart = paysdepart;
        this.villearrivee = villearrivee;
        this.paysarrivee = paysarrivee;
        this.datedepart = datedepart;
        this.nbrplacedispo = nbrplacedispo;
        this.duree = duree;
        this.prixinscription = prixinscription;
      }
}