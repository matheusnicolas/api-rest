import HttpStatus from 'http-status-codes'

export let responseErrorCatch = (code) => {
    let erro = {error: HttpStatus.getStatusText(code)};
    return erro;
}

export let responseNotFoundProfessor = () => {
    return {error: MSG_PROFESSOR_NOT_FOUND};
}

export const MSG_PROFESSOR_NOT_FOUND = 'professor não encontrado'