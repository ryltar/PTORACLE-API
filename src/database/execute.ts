import {getConnection} from './../config/database';
const oracledb = require('oracledb');

export async function doExecution(command:string, params:any): Promise<any> {
    return new Promise((resolve, reject) => {
        let result = getConnection().then( (connection:any)=>{
            connection.execute(
                command,
                params,
                {autoCommit: true},
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        reject(err.message);
                    }
                    resolve(result);
                })
        });
    })
}