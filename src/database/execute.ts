import {getConnection} from './../config/database';
const oracledb = require('oracledb');

export async function onlyOneExecution(command:string, params:any): Promise<any> {
    return new Promise((resolve, reject) => {
        let result = getConnection().then( (connection:any)=>{
            if(params){
                console.log(params);
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



