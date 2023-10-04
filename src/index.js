const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); 
const path = require('path');

 const app = express();

 require('dotenv').config()

 app.set('port', process.env.PORT || 4000);

 app.set('views', path.join(__dirname, 'views')); 

 app.engine('.hbs', exphbs.engine({

    defaultLayout: 'main', 

    layoutsDir: path.join(app.get('views'), 'layouts'), 

    extname: '.hbs' 

}));


app.set('view engine', '.hbs'); 

app.use(morgan('dev'));

app.use(express.urlencoded({extended: false})); 

app.use(require('./routes'));

app.use('/estudiantes',require('./routes/estudiantes')); 
app.use('/carreras', require('./routes/carreras'));


app.use(express.static(path.join(__dirname, 'public')));

 app.listen(app.get('port'), () =>{

    console.log('Servidor iniciando en el puerto: ', app.get('port'));

 });

