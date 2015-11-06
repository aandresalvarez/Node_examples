//incluye librerias
var express =require('express');//framework web 
var bodyParser=require('body-parser');//para mostrar infomracion mas clara
var mongoose=require('mongoose');//driver para mongo
var multer=require('multer');//para poder cargar imagenes-- multipart/form-data en el jade
var cloudinary=require('cloudinary');//www.cloudinary.com -- servicio para cargar fotos 

cloudinary.config(
{cloud_name: "alvaro2016",
api_key:"182174425728644",
api_secret:"gYiF3RuRu74HluNMvT_p7S8Cjks"
});



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




//para poder ver en la consola el metodo post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 var uploader= multer({dest: "./uploads"}); //aqui se guardaran las fotos que se suban


//llama al motor de vistas jade
app.set("view engine","jade"); 

// define la carpeta public como la carpeta para compartir
app.use(express.static("public"));



//presentacion de la pagina principal index
app.get("/",function(req,res){
	res.render("index");
	//res.end("hola mundo");
});

//nueva ruta para la pagina del menu
app.get("/menu",function(req,res){
	Product.find(function(error,documento)
	{
		if(error){console.log(error); res.send('hello world');}
		else {res.render("menu/index",
				{products: documento}

			);}
	});



});


//++para que funcione el multer
var middleware_upload = uploader.single('image_avatar');

//creacion de los productos y guardado en la base de datos de mongo DB
app.post("/menu",middleware_upload, 
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
		 console.log(req.file);

		product.save(function(err){
		console.log(product);
		res.render("menu/index");
		});

	} else{

		res.render("menu/new");
	};
	
});

app.get("/menu/new",function(req,res){
	res.render("menu/new");

});

app.listen(8080);