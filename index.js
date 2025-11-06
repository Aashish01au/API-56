const http = require("http")
const app = require("./src/config/express.config")
const sever = http.createServer(app)
sever.listen(9000,"localhost",(error)=>{
    if(!error){
        console.log("server is running at port number = 9000")
        console.log("Browse server at http://localhost:9000")
        console.log("Press CTRL + C to disconnect the server")
    }
})
