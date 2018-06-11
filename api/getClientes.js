
async function getData(id){
    const mysql = await require('mysql2/promise');
    var query = `SELECT * FROM speed.clientes WHERE idclientes = ${id};`;
    if(id == '*'){
        query = "SELECT * FROM speed.clientes";
    }
    let conexion;
    if (process.env.PRODUCTION){
        conexion = await mysql.createConnection(
            {
                host: process.env.Host_db,
                user: process.env.Username_db,
                password: process.env.Password_db,
                database: process.env.Database_db
            }
        );

    }else{
        conexion = await mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'speed'
            }
        );
    }
    

    const [rows,fields] = await conexion.execute(query);

    

    return rows;
}

module.exports = getData;

