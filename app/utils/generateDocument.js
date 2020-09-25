import fs from 'fs'
import Config from './../../config'

export const generateDocument = (newDocument) => {
    const cpf = newDocument.cpf.replace(/[^0-9]/g,'')

    const contentFile = `
    Nome Completo      : ${newDocument.fullName}
    Data de Nascimento : ${newDocument.data}
    CPF                : ${newDocument.cpf}
    RG                 : ${newDocument.rg}

    Usuario Autenticado
    Login              : ${newDocument.login}
    IP                 : ${newDocument.ip}
    `

    fs.writeFile(`${Config.DIR_NAME_FILES}/doc_${cpf}.txt`, contentFile, (error)=>{
        if(error){
            console.error('Error trying to save the file to disk: ', error)
            return error
        }
        console.log('File saved successfully.')
    })
    return true;
}

