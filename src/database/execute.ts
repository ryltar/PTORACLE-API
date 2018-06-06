import {getConnection} from './../config/database';
const oracledb = require('oracledb');

export async function getExecution(command:string, params:any): Promise<any> {
    return new Promise((resolve, reject) => {
        let result = getConnection().then( (connection:any)=>{
            if(params){
                console.log(params);
                connection.execute(
                    command,
                    params,
                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            reject(err.message);
                        }
                        resolve(result);
                    })
            }else{
                console.log("SUPERMAN");
                connection.execute(
                    command,
                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            reject(err.message);
                        }
                        resolve(result);

                    })
            }
        });
    })
}

export async function deleteExecution(command:string, params:any): Promise<any> {
    return new Promise((resolve, reject) => {
        let result = getConnection().then( (connection:any)=>{
            if(params){
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
            }else{
                console.log("SUPERMAN");
                connection.execute(
                    command,
                    {autoCommit: true},
                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            reject(err.message);
                        }
                        resolve(result);

                    })
            }
        });
    })
}



