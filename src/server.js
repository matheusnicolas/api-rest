import express from 'express'
import routes from './routes/routes'
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes );


app.listen(9000, () => {
    console.log('Servidor rodando na porta 9000')
})