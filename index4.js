let express = require("express")
let personas = require("./personas4")
let bodyParser = require("body-parser")
let nombres = []

let app = express()
app.use(bodyParser.urlencoded({ extended: false}))

app.get("/", (req, res) => { res.end("Hola Mundo!!")} )

app.post(["/personas/:nombre/:apellido/:idestado","/personas"], async (req, res) => { 
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

app.get(["/personas/:id","/personas"], async (req, res) => { 
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

app.delete(["/personas/:id","/personas"], async (req, res) => { 
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

app.get(["/estadocivil"], async (req, res) => { 
	
	res.setHeader("Content-Type","application/json")			
	await personas.consulrStdCivil( (err, results) => {
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
})

app.get(["/estadocivil/agrupacion"], async (req, res) => { 
	
	res.setHeader("Content-Type","application/json")			
	await personas.agrupStdCivil( (err, results) => {
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
})

app.listen(8000)