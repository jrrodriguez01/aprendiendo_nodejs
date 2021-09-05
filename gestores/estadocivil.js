let mysql = require('mysql');
const {config} = require('./db')

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

async function consultarEstadoCivil(callback){
	try {		
		let connection = await initializeConnection(config)
		await connection.query('SELECT id, descripcion FROM estadocivil', function (err, results) {						
					connection.end()
					callback(err, results);
				});	
	}
	catch(err){
		callback(" " + err, null);
	}
}

async function GroupByEstadoCivil(callback){
	try {		
		let connection = await initializeConnection(config)
		await connection.query('SELECT descripcion, count(node_persona.id) as cant_persona FROM estadocivil join node_persona on estadocivil.id = node_persona.estado_civil group by descripcion', function (err, results) {						
					connection.end()
					callback(err, results);
				});	
	}
	catch(err){
		callback(" " + err, null);
	}
}

exports.consulrStdCivil = consultarEstadoCivil
exports.agrupStdCivil = GroupByEstadoCivil