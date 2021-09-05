let express = require("express")
let personas = require("../gestores/estadocivil")

let app = express.Router()

app.get(["/"], async (req, res) => { 
	
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

app.get(["/agrupacion"], async (req, res) => { 
	
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

exports.router = app
