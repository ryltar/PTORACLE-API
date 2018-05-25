const oracledb = require('oracledb');
import {hrPool} from "./config_db";

export async function getConnection() : Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const conn = oracledb.getConnection(
            {
                user          : hrPool.user,
                password      : hrPool.password,
                connectString : hrPool.connectString
            },

            function(error, connection){
                if (error) {
                    console.error(error.message);
                    return;
                }

                connection.execute(
                    `ALTER SESSION SET CURRENT_SCHEMA = :schema`,
                    [hrPool.applicationExpress],
                    function(err, result) {
                        console.log(connection);
                        if (err) {
                            return(err.message);
                        }
                        resolve(connection);
                        console.log(connection);
                        return(connection);
                    });
            });
    })
}



