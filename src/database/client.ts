import {test} from './../config/database';
const oracledb = require('oracledb');

function simpleExecute() {
    return new Promise(async (resolve, reject) => {
        let conn;

        try {
            conn = await oracledb.getConnection(
                {
                    user          : "SYSTEM",
                    password      : "SYSTEM",
                    connectString : "localhost/XE"
                });
            const result = await conn.execute("select * from DBA_USERS");
            console.log(result)
            resolve(result)
            return result;
        } catch (err) {
            reject(err);
        } finally {
            if (conn) { // conn assignment worked, need to close
                try {
                    await conn.close();
                } catch (err) {
                    console.log(err);
                }
            }
        }
    });
}

try {
    console.log('Initializing database module');
    simpleExecute()
} catch (err) {
    console.error(err);
}


