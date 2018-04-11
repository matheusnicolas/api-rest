import HttpStatus from 'http-status-codes'

export let responseErrorCatch = (code) => {
    let erro = {error: HttpStatus.getStatusText(code)};
    return erro;
}

export let responseNotFoundNota = () => {
    return {error: MSG_NOTA_NOT_FOUND};
}

export const MSG_NOTA_NOT_FOUND = 'nota não encontrada'