const oracledb = require('oracledb');
import {hrPool} from "./config_db";

export async function getConnection() : Promise<any> {
    return new Promise<any>((resolve, reject) => {
         oracledb.getConnection(
            {
                user          : hrPool.user,
                password      : hrPool.password,
                connectString : hrPool.connectString
            },
            function(error, connection){
            if (error) {
                console.error(error.message);
                reject(error.message);
            }
            connection.execute(
                `ALTER SESSION SET CURRENT_SCHEMA = `
                +hrPool.applicationExpress,
                function(err, result) {
                    if (err) {
                        return(err.message);
                    }
                    resolve(connection);
                });
        })
    });

}



