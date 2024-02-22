import fs from 'fs';

type JSONContent = Record<string, any>;

function lerArquivoJSON(nomeArquivo: string): JSONContent {
    if (!fs.existsSync(nomeArquivo)) {
     
        return {};
    }

    const conteudo = fs.readFileSync(nomeArquivo, 'utf-8');
    if (!conteudo.trim()) {
      
        return {};
    }

    return JSON.parse(conteudo);
}

function escreverArquivoJSON(nomeArquivo: string, conteudo: JSONContent): void {
    const conteudoString = JSON.stringify(conteudo, null, 2);
    fs.writeFileSync(nomeArquivo, conteudoString, 'utf-8');
}

// Caminho do arquivo JSON
const caminhoArquivo = './bd.json';


const conteudoDoArquivo = lerArquivoJSON(caminhoArquivo);
console.log('Conteúdo do arquivo:', conteudoDoArquivo);


conteudoDoArquivo.novoCampo = 'Valor novo 2';

escreverArquivoJSON(caminhoArquivo, conteudoDoArquivo);
console.log('Conteúdo modificado foi escrito no arquivo.');