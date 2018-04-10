import express from 'express'
import routes from './routes/routes'
import salaRoutes from './routes/salaRoutes'
import userRoutes from './routes/userRoutes'
import disciplinaRoutes from './routes/disciplinaRoutes'
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static',express.static('public'))
//app.use(auth)

app.use('/', routes);
app.use('/api/salas', salaRoutes)
app.use('/api/users', userRoutes)
app.use('/api/disciplina', disciplinaRoutes)

app.listen(9000, () => {
    console.log('Servidor rodando na porta 9000')
})