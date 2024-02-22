import fs from 'fs';


type JSONContent = {
    usuarios?: Usuario[];
};


type Usuario = {
    nome: string;
    email: string;
    cpf: string;
    profissao?: string;
    endereco?: Endereco | null;
};


type Endereco = {
    cep: string;
    rua: string;
    complemento?: string;
    bairro: string;
    cidade: string;
};

// Função para ler o arquivo JSON
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

function excluirUsuario(cpf: string, arquivo: string): Usuario | null {
    const conteudoDoArquivo = lerArquivoJSON(arquivo);
    const usuarios: Usuario[] = conteudoDoArquivo.usuarios || [];

    const usuarioIndex = usuarios.findIndex(usuario => usuario.cpf === cpf);
    if (usuarioIndex === -1) {
        return null; 
    }

    const usuarioExcluido = usuarios.splice(usuarioIndex, 1)[0];
    conteudoDoArquivo.usuarios = usuarios;
    escreverArquivoJSON(arquivo, conteudoDoArquivo);

    return usuarioExcluido;
}

const arquivo = './bd.json';


const cpfUsuarioExcluir = '123.456.789-00';
const usuarioExcluido = excluirUsuario(cpfUsuarioExcluir, arquivo);
if (usuarioExcluido) {
    console.log('Usuário excluído:', usuarioExcluido);
} else {
    console.log('Usuário não encontrado.');
}