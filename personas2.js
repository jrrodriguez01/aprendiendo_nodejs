let personas = []

function agregar(nueva){
	personas.push(nueva)
}

function consultar(){
	return personas
}

function obtener(id){
	return personas[id]
}

exports.add = agregar
exports.query = consultar
exports.obtener = obtener