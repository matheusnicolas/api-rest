import HttpStatus from 'http-status-codes'

export let responseErrorCatch = (code) => {
    let erro = {error: HttpStatus.getStatusText(code)};
    return erro;
}

export let responseNotFoundAtividade = () => {
    return {error: ATIVIDADE_NOT_FOUND};
}

export const ATIVIDADE_NOT_FOUND = 'Atividade não encontrada'