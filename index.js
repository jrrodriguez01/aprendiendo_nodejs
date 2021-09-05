let express = require("express")
let personas = require("./personas")
let bodyParser = require("body-parser")
let contador = 0
let nombres = []

let app = express()
app.use(bodyParser.urlencoded({ extended: false}))

app.get("/", (req, res) => { res.end("Hola Mundo!!")} )

app.get("/contar", (req, res) => { 
	contador++
	res.end("contando correctamente")
})

app.get("/consultar", (req, res) => { res.end(`Visitas: ${contador}`)} )

/*app.get("/agregar/:nombre", (req, res) => { 
	//nombres.push(req.params.nombre)
	personas.add(req.params.nombre)
	res.end(`agregado: ${req.params.nombre}`)
})*/

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

/*app.get("/listar", (req, res) => { 
	//let filas = nombres.reduce((x,y) => x + `<tr><td>${y}</td></tr>`, '')
	let filas = personas.query().reduce((x,y) => x + `<tr><td>${y}</td></tr>`, '')
	res.end(`<table>${filas}</table>`)
})*/

app.get("/listar", (req, res) => { 	
	let filas = personas.query().reduce((x,y) => x + `<tr><td>${y.nombre}</td><td>${y.apellido}</td></tr>`, '')
	res.end(`<table>${filas}</table>`)
})

app.listen(8000)