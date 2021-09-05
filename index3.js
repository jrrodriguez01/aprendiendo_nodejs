let express = require("express")
let personas = require("./personas3")
let bodyParser = require("body-parser")
let nombres = []

let app = express()
app.use(bodyParser.urlencoded({ extended: false}))

app.get("/", (req, res) => { res.end("Hola Mundo!!")} )

app.get("/agregar/:nombre/:apellido", async (req, res) => { 
	const nuevaPersona = { nombre: req.params.nombre, apellido: req.params.apellido}
	await personas.add( nuevaPersona, (err, results) => {
		if (err)
		  res.send(err)		  
		else
		  res.send(`Se agrego: ${results}`)
	});
})

app.get("/agregar", (req, res) => { 
	const nuevaPersona = { nombre: req.query.nombre, apellido: req.query.apellido}
	personas.add(nuevaPersona)
	res.end(`agregado: ${nuevaPersona.nombre}`)
})

app.post("/agregar", (req, res) => { 
	const nuevaPersona = { nombre: req.body.nombre, apellido: req.body.apellido}
	personas.add(nuevaPersona)
	res.end(`agregado: ${nuevaPersona.nombre}`)
})

app.get("/listar", async (req, res) => { 				
	res.setHeader("Content-Type","application/json")				
	const valor = await personas.query()
	res.end(valor)
	/*await personas.query( (err, results) => {
		if (err)
		  res.send(err)		  
		else
		  res.send(results)
	});*/
})

app.get("/obtener/:id", async (req, res) => { 
	res.setHeader("Content-Type","application/json")		
	await personas.obtener( req.params.id, (err, results) => {
		if (err)
		  res.send(err)		  
		else
		  res.send(results)
	});
})

app.get("/borrar/:id", async (req, res) => { 
	res.setHeader("Content-Type","application/json")		
	await personas.borrar( req.params.id, (err, results) => {
		if (err)
		  res.send(err)		  
		else
		  res.send(results)
	});
})

app.listen(8000)