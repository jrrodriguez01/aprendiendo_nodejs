let express = require("express")
let personas = require("./personas2")
let bodyParser = require("body-parser")
let nombres = []

let app = express()
app.use(bodyParser.urlencoded({ extended: false}))

app.get("/", (req, res) => { res.end("Hola Mundo!!")} )

app.get("/agregar/:nombre/:apellido", (req, res) => { 
	const nuevaPersona = { nombre: req.params.nombre, apellido: req.params.apellido}
	personas.add(nuevaPersona)
	res.end(`agregado: ${nuevaPersona.nombre}`)
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

app.get("/listar", (req, res) => { 		
	res.setHeader("Content-Type","application/json")
	res.end(JSON.stringify(personas.query()))
})

app.get("/obtener/:id", (req, res) => { 
	res.setHeader("Content-Type","application/json")
	res.end(JSON.stringify(personas.obtener(req.params.id)))
})

app.listen(8000)