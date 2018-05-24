const oracledb = require('oracledb');
const dbConfig = require('./config_db.js');

export async function test() {
    return new Promise(async (resolve, reject) => {
        let conn;

        const u = await oracledb.getConnection(
            {
                user          : "SYSTEM",
                password      : "SYSTEM",
                connectString : "localhost/XE"
            },
            function(err, connection)
            {
                if (err) { console.error(err); return; }
                console.log("test");
                connection.execute(
                    "ALTER SESSION SET CURRENT_SCHEMA = PROJET_ORACLE",
                    function(err, result)
                    {
                        if (err) { console.error(err); return; }
                        console.log(result.rows + "z");
                        resolve(u);
                        console.log(u+'eeeeee');
                        return u
                    });
            });

        console.log(await u+ "fff");
    });
}
