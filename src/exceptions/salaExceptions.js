import HttpStatus from 'http-status-codes'

export let responseErroCatch = (code) => {
    let erro = {error: HttpStatus.getStatusText(code)}
    return erro
}

export let responseNotFoundSala = () => {
    return {error: MSG_SALA_NOT_FOUND}
}

export const MSG_SALA_NOT_FOUND = "sala não encontrada"