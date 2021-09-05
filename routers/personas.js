let express = require("express")
let bodyParser = require("body-parser")
let personas = require("../gestores/personas")

let app = express.Router()

app.use(bodyParser.urlencoded({ extended: false}))

app.post(["/:nombre/:apellido/:idestado","/"], async (req, res) => { 
	let nuevaPersona = {}	
	if(req.params.nombre !== undefined && req.params.apellido !== undefined){		
		nuevaPersona = { nombre: req.params.nombre, apellido: req.params.apellido, estadocivil: req.params.idestado}
	}else if(req.query.nombre !== undefined && req.query.apellido !== undefined){		
		nuevaPersona = { nombre: req.query.nombre, apellido: req.query.apellido, estadocivil: req.query.idestado}
	}else if(req.body.nombre !== undefined && req.body.apellido !== undefined){		
		nuevaPersona = { nombre: req.body.nombre, apellido: req.body.apellido, estadocivil: req.body.idestado}
	}
	
	if(nuevaPersona.nombre !== undefined && nuevaPersona.nombre !== '' 
		&& nuevaPersona.apellido !== undefined && nuevaPersona.apellido !== ''){
		await personas.add( nuevaPersona, (err, results) => {
			if (err) {
			  console.log(err)	
			  res.status(500).end()
			}else{
				if(results){					
					res.setHeader("Location",`/personas/${results}`)
					res.status(301).send()
				}else{
					res.status(500).end()					
				}
			}			  
		});
	}else{
		res.status(400).end()
	}
})

app.get(["/:id","/"], async (req, res) => { 
	let id = undefined
	if(req.params.id !== undefined){		
		id = req.params.id
	}else if(req.query.id !== undefined){		
		id = req.query.id
	}else if(req.body.id !== undefined){		
		id = req.body.id
	}
	
	res.setHeader("Content-Type","application/json")		
	if(id === undefined || id === ''){
		await personas.query( (err, results) => {
			if (err) {
			  console.log(err)	
			  res.status(500).end()
			}else{
				if(results){
					res.send(results)
				}else{
					res.status(404).end()
				}
			}	
		});
	}else{		
		await personas.obtener( id, (err, results) => {
			if (err) {
			  console.log(err)	
			  res.status(500).end()
			}else{
				if(results){
					res.send(results)
				}else{
					res.status(404).end()					
				}
			}	
		});
	}	
})

app.delete(["/:id","/"], async (req, res) => { 
	let id = undefined
	if(req.params.id !== undefined){		
		id = req.params.id
	}else if(req.query.id !== undefined){		
		id = req.query.id
	}else if(req.body.id !== undefined){		
		id = req.body.id
	}
	
	res.setHeader("Content-Type","application/json")		
	if (id !== undefined){
		await personas.borrar( id, (err, results) => {
			if (err) {
			  console.log(err)	
			  res.status(500).end()			  
			}
			else
			  res.send(results)
		});
	}else{
		res.status(400).end() 
	}
})

exports.router = app