var http = require('http');
//var _ =require('lodash');
//var array =[1,2,3,4,5,"perro"];

http.createServer(function (req,res) 
	{
		res.writeHead(200,{'Content-Type':'text/plain'});
		res.write('-mandamos a procesar un archivo grande ... cargando datos\n');
		setTimeout(function(){
			
			console.log("procesamos archivo pesado...");
			console.log("se envia un correo electronico");
		},10000);
		res.write('-mientras tanto hacemos algo mas \n');
		res.end();	
		
	}).listen(1337,"localhost");
console.log('ecuchando el puerto 1337');