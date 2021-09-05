let express = require("express")
let routerPersonas = require('./routers/personas')
let routerEC = require('./routers/estadocivil')

let app = express()

app.get("/", (req, res) => { res.end("Hola Mundo!!")} )
app.use("/personas",routerPersonas.router)
app.use("/estadocivil",routerEC.router)

app.listen(8000)