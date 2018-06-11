async function insertData(body){
    var nombre = body.nombre, ubi1 = body.ubi1;
    const mysql = await require('mysql2/promise');

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

    var checkQuery = `SELECT nombre FROM speed.clientes WHERE nombre = '${nombre}'`;

    var query = `INSERT INTO speed.clientes (nombre, ubicacion1) VALUES ('${nombre}', '${ubi1}')`;

    //QUIERO CHECAR SI ESE NOMBRE YA EXISTE COñO :C
    var checkQuery = `SELECT nombre FROM speed.clientes WHERE nombre = '${nombre}'`;
    var [checkResults,info] = await conexion.execute(checkQuery);

    console.log(checkResults.length);//cuando no hay regresa '[]' y cuando si hay regresa'[ BinaryRow { nombre: 'dylans' }]'
    if(checkResults.length){
        return 0;
    }else{
        //hacer el insert
        await conexion.execute(query);
        return 1;
    }
}

module.exports = insertData;