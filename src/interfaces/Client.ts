export interface IClient {
    idClient: number
}

export class Client {
    idClient: number;

    constructor(idClient: number) {
        this.idClient = idClient;
    }
}