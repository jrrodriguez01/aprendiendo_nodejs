let personas = []

function agregar(nueva){
	personas.push(nueva)
}

function consultar(){
	return personas
}

exports.add = agregar
exports.query = consultar