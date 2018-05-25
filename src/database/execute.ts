import {getConnection} from './../config/database';

async function simpleExecute(command:string, params:Array<string>): Promise<any> {
    let conn;
    const result =  getConnection().then((test) =>{
        console.log(test)
    });

    /**
    result.execute(
            command,
            function(err, result) {
                if (err) {
                    console.error(err.message);
                    return;
                }
                return(result.rows);
    })

     **/
}

simpleExecute("SELECT * from LieuAVisiter", null);

