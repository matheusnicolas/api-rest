import express from 'express'
import routes from './routes/routes'
import salaRoutes from './routes/salaRoutes'
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes );
app.use('/api/salas', salaRoutes)


app.listen(9000, () => {
    console.log('Servidor rodando na porta 9000')
})