import express from 'express'

const app = express()

app.listen(9000, () => {
    console.log('Servidor rodando na porta 9000')
})