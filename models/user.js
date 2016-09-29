var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var posibles_valores = ["M","F"];
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email válido"];

var password_validation = {
	validator: function(p){
				return this.password_confirmation == p;
			},
			message: "Las contraseñas no son iguales"

};


var user_schema = new Schema({
	name: String,
	last_name: {String},
	username: {type: String, require: true, maxlength: [50,"Username muy largo"]},
	password: { type: String,  minlength: [5,"El password es muy corto"], validate: password_validation},
	age: {type: Number, min: [5,"La edad no puede ser menor que 5"], max: [100,"La edad no puede ser mayor que 100"]},
	email: {type: String, require: "El correo es obligatorio", match: email_match},
	date_of_birth: Date,
	sex: {type: String, enum: {values: posibles_valores, message: "Opción no valida"}}
});


user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});

/* Otra forma de utilizar el virtual
user_schema.virtual("full_name").get(function(){
	return this.name + this.last_name;
}).set(function(full_name){
	var words = full_name.split(" ");
	this.name = words[0];
	this.last_name = words[1];
});
*/

var User = mongoose.model("User", user_schema);

module.exports.User = User;

/*
	String 
	Number
	Date
	Buffer
	Boolean
	Mixed
	Objectid
	Array
*/