const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); // Necesario para utilizar el motor de plantillas handlebars
const path = require('path');
//Inicializaciones
 const app = express();

 require('dotenv').config()

 //Ajuste del servidor
 app.set('port', process.env.PORT || 4000);
 app.set('views', path.join(__dirname, 'views')); // Configuracion de la ruta donde se encuentran las vistas
 app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main', // Configuracion del layout principal
    layoutsDir: path.join(app.get('views'), 'layouts'), // Configuracion de la ruta de los layouts
    partialsDir: path.join(app.get('views'), 'partials'), // Configuracion de vistas parciales
    extname: '.hbs', // Configura la extensión que tendran los archivos HandleBars
    helpers: require('./lib/handlebars') // Configuracion de funciones

}));

app.set('view engine', '.hbs'); // Configuracion para ejecutar el motor de plantillas

app.use(morgan('dev')); // Configurando el middleware morgan para visualizar que esta llegando al servidor
app.use(express.urlencoded({extended: false})); // Sirve para poder aceptar datos desde formularios

app.use(require('./routes'));
app.use('/estudiantes',require('./routes/estudiantes')); // Configuracion de ruta para estudiantes
app.use('/carreras', require('./routes/carreras')); 
app.use('/profesores', require('./routes/profesores'));
app.use('/materias', require('./routes/materias'));

// Archivos publicos (aca se coloca todo el código al cual el navegador puede acceder)
app.use(express.static(path.join(__dirname, 'public')));

 //Iniciar el servidor
 app.listen(app.get('port'), () =>{
    console.log('Servidor iniciando en el puerto: ', app.get('port'));
 });
