var express =require('express'); //incluye librerias
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
//var jade= require('jade');


//crear la aplicacion express 
var app=express();

//establece la conexion con la base de datos que vamos a usar
mongoose.connect("mongodb://localhost/primera_pagina");

//definir esquema de la base de datos (tables)
var productSchema={
	title:String,
	description:String,
	imageUrl:String,
	pricing:Number
};


//Se genera un Modelo a partir del esquema (MVC)
var Product=mongoose.model("Product",productSchema);

//se crea un ejemplo de insert en la base de datos para probar que funciona
/*var data={
	title: "Mi primer Producto",
	description:"Una Compra grande",
	imageUrl:"data.png",
	pricing: 12
};
var product = new Product(data);

product.save(function(err){
	console.log(product);
});*/


//para poder ver en la consola el metodo post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//llama al motor de vistas jade
app.set("view engine","jade"); 

// define la carpeta public como la carpeta para compartir
app.use(express.static("public"));



//presentacion de la pagina principal index
app.get("/",function(req,res){
	res.render("index");
	//res.end("hola mundo");
});





app.post("/menu", 
	function(req,res)
	{
		//console.log(req.bodyParser);
	if (req.body.password == "abc") 
	{


		//se einsertan los resultados que llegan del formulario en menu
		var data={
				title: req.body.title,
				description: req.body.description,
				imageUrl: "data.img",
				pricing: req.body.pricing
				};

		var product = new Product(data);

		product.save(function(err){
		console.log(product);
		res.render("index");
		});

	} else{

		res.render("menu/new");
	};
	
});

app.get("/menu/new",function(req,res){
	res.render("menu/new");

});

app.listen(8080);