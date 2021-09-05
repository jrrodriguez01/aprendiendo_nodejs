let mysql = require('mysql');

const config = {
    host: "localhost",
    user: "root",
    password: "",
	database: "test"
}

/*const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

conn.connect(function(err) {
    if (err) throw err
});*/

async function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");

                    initializeConnection(connection.config);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }

    let connection = mysql.createConnection(config);

    // Add handlers.
    addDisconnectHandler(connection);

    connection.connect();
	
    return connection;
}


async function agregar(nueva, callback){
	try {		
		let connection = await initializeConnection(config)		
		await connection.query('INSERT INTO node_persona (nombre, apellido) VALUES (? , ?)', [nueva.nombre, nueva.apellido], function (err, results) {		
					console.log("Number of records inserted: " + results.affectedRows)
					connection.end()
					callback(err, results.insertId);					
				});
	}
	catch(err){
		callback(" " + err, null);
	}
}

async function consultar(callback){
	try {		
		let connection = await initializeConnection(config)
		await connection.query('SELECT id, nombre, apellido FROM node_persona', function (err, results) {						
					connection.end()
					callback(err, results);
				});	
	}
	catch(err){
		callback(" " + err, null);
	}
}
	
/*async function consultar(callback){	
	try {		
		await conn.query('SELECT id, nombre, apellido FROM node_persona', function (err, results) {			
			console.log('Query result: ', results.length);
			callback(err, results);
		});	
	}
	catch(err){
		callback(" " + err, null);
	}
}*/

async function obtener(id, callback){
	try {		
		let connection = await initializeConnection(config)		
		await connection.query('SELECT id, nombre, apellido FROM node_persona where id = ?', [id], function (err, results) {							
					connection.end()
					callback(err, results[0]);					
				});
	}
	catch(err){
		callback(" " + err, null);
	}
}

async function borrar(id, callback){
	try {		
		let connection = await initializeConnection(config)		
		await connection.query('DELETE FROM node_persona where id = ?', [id], function (err, results) {							
					connection.end()
					callback(err, "Number of records deleted: " + results.affectedRows);					
				});
	}
	catch(err){
		callback(" " + err, null);
	}
}

exports.add = agregar
exports.query = consultar
exports.obtener = obtener
exports.borrar = borrar