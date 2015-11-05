var http = require('http');
var _ =require('lodash');
var array =[1,2,3,4,5,"perro"];

http.createServer(function (req,res) 
	{
		res.writeHead(200,{'Content-Type':'text/plain'});
		res.write('-hola mundo\n');
		_.each(array, 
			function(val,i)
			{
				if(val=2){
					console.log("dooos" );
				}
			console.log(val*2 + val );
			}
			  );
		res.end();
				
	}).listen(1337,"localhost");
console.log('ecuchando el puerto 1337');