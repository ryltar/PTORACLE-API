import {Controller, Delete, Get, Post, Put, PathParams, BodyParams} from "@tsed/common";
import {IPersonne, Personne} from "../interfaces/Personne";
import {doExecution} from "../database/execute";

@Controller('/login')
export class LoginCtrl {
    /**
     * connection function
     * @param body 
     * @returns tab
     */
    @Post('/')
    async connect(@BodyParams() body:any): Promise<Array<IPersonne[]>|any> {
        var tab = []
        // Check if login and mdp match with a person
        let personnes = await doExecution("SELECT * from personne WHERE login = :identifiant AND mdp = :motdepasse ", [body.login, body.mdp])
        if (personnes.length == 0) return 607
        let personne = new Personne(personnes.rows[0][0], personnes.rows[0][1], personnes.rows[0][2], personnes.rows[0][3], personnes.rows[0][4], personnes.rows[0][5])
        // add person to tab
        tab.push(personne)
        // checking role
        if (await doExecution("SELECT * from administrateur WHERE idadministrateur = :identifiant ", [personne.idPersonne])) //if the person is an admin
            var role = "admin"
        else if (await doExecution("SELECT * from client WHERE idadministrateur = :identifiant ", [personne.idPersonne])) { //if the person is a client
            var role = "client"
        } else { // if not an admin and not a client
            return 607
        }
        // add role to tab
        tab.push(role)
        // return tab
        return tab
    }
}