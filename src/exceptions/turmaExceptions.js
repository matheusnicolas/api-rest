import HttpStatus from 'http-status-codes'

export let responseErrorCatch = (code) => {
    let erro = {error: HttpStatus.getStatusText(code)}
    return erro
}

export let responseNotFoundTurma = () => {
    return {error: MSG_TURMA_NOT_FOUND}
}

export const MSG_TURMA_NOT_FOUND = "turma não encontrada"