import {getConnection} from './../config/database';

export async function onlyOneExecution(command:string, params:Array<string>): Promise<any> {
    return new Promise((resolve, reject) => {
        const result = getConnection().then( (connection:any)=>{
            if(params){
                connection.execute(
                    command,
                    [params],
                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            reject(err.message);
                        }
                        resolve(result.rows);
                    })
            }else{
                connection.execute(
                    command,
                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            reject(err.message);
                        }
                        resolve(result.rows);
                    })
            }
        });
    })
}



