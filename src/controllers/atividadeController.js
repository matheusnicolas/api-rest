import express from 'express'
import HttpStatus from 'http-status-codes'
import * as exceptions from '../exceptions/atividadeExceptions'
import {Atividade} from '../models/models'

let router= express.Router()

export let cadastrarAtividade= (req,res)=>{
	const descricao = req.body.descricao;
	const pontuacao = req.body.pontuacao;
	const dataEncerramento = req.body.dataEncerramento;
	const arquivoAtividade = req.body.arquivoAtividade;
	const turma= req.body.turma;
	const data = {pontuacao:pontuacao,dataEncerramento:dataEncerramento,descricao:descricao,arquivoAtividade:arquivoAtividade,turma:turma}

    Atividade.create(data).then((atividade) =>{
    	res.status(HttpStatus.CREATED).json(atividade).send()
    }).catch((erro) => {
    	res.status(HttpStatus.BAD_REQUEST)
    		.json(exceptions.responseErroCatch(HttpStatus.BAD_REQUEST))
    		.send()
    });
	
};

export let getAllAtividade= (req,res)=>{
	Atividade.findAll().then((atividade)=>{
		res.status(HttpStatus.OK).json(atividade).send()
		
	})
}


export let getAtividadeById = (req,res)=>{
	const id_atividade = req.params.id_atividade;
	Atividade.findById(id_atividade).then((atividade) =>{
		if(atividade){
			res.status(HttpStatus.OK).json(atividade).send();
		}else{
			res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundAtividade()).send()
		}
	})
}


export let submeterAtividade = (req,res) => {
	const id_atividade= req.params.id_atividade;
	Atividade.findById(id_atividade).then((atividade) =>{
		if(atividade){
			const data= req.body;
			atividade.update(data).then(()=>{
				res.status(HttpStatus.OK).json(atividade).send()
			}).catch((erro)=>{
				res.status(HttpStatus.BAD_REQUEST).json(exceptions.responseErroCatch(HttpStatus.BAD_REQUEST)).send()
		})
	}	else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseErroCatch(HttpStatus.BAD_REQUEST)).send()
        }
    })
}


export let excluirAtividade = (req,res)=>{
	const id_atividade= req.params.id_atividade;
	Atividade.findById(id_atividade).then((atividade)=>{
		if (atividade){
			atividade.destroy().then((atividade)=>{
				res.status(HttpStatus.OK).json(atividade).send();
			}).catch((erro)=>{
				res.status(HttpStatus.BAD_REQUEST)
					.json(responseErroCatch(HttpStatus.BAD_REQUEST))
					.send()
			})
		}else{
			res.status(HttpStatus.NOT_FOUND).json(responseNotFoundAtividade().send())
		}
	})
}


/*export let atualizarPontuacao = (req,res)=>{
	const id_Atividade= req.body.id_Atividade;
	Atividade.findById(id_Atividade).then((atividade)=>{
		if(atividade){
			const pontuacao= req.body.pontuacao;
			const data= {pontuacao:pontuacao}
			atividade.update(data).then(()=>{
				res.status(HttpStatus.OK).json(atividade).send()
			}).catch((erro)=>{
				res.status(HttpStatus.BAD_REQUEST).json(responseErroCatch(HttpStatus.BAD_REQUEST)).send()
			})
		}else{
			res.status(HttpStatus.NOT_FOUND).json(responseNotFoundAtividade()).send()
		}
	})
}*/


