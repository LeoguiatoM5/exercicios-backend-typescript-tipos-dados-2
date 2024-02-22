import fs from 'fs';


type JSONContent = Record<string, any>;


type Endereco = {
    cep: string;
    rua: string;
    complemento?: string;
    bairro: string;
    cidade: string;
};


type Usuario = {
    nome: string;
    email: string;
    cpf: string;
    profissao?: string;
    endereco?: Endereco | null;
};


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


function cadastrarUsuario(usuario: Usuario, arquivo: string): Usuario {
    const conteudoDoArquivo = lerArquivoJSON(arquivo);
    const novoUsuario = { ...usuario };
    conteudoDoArquivo.usuarios = conteudoDoArquivo.usuarios || [];
    conteudoDoArquivo.usuarios.push(novoUsuario);
    escreverArquivoJSON(arquivo, conteudoDoArquivo);
    return novoUsuario;
}


function listarUsuarios(arquivo: string): Usuario[] {
    const conteudoDoArquivo = lerArquivoJSON(arquivo);
    return conteudoDoArquivo.usuarios || [];
}

const arquivo = './bd.json';


const novoUsuario: Usuario = {
    nome: 'Fulano',
    email: 'fulano@example.com',
    cpf: '123.456.789-00',
    profissao: 'Desenvolvedor',
    endereco: {
        cep: '12345-678',
        rua: 'Rua Exemplo',
        bairro: 'Bairro Exemplo',
        cidade: 'Cidade Exemplo'
    }
};
const usuarioCadastrado = cadastrarUsuario(novoUsuario, arquivo);
console.log('Usuário cadastrado:', usuarioCadastrado);

const usuarios = listarUsuarios(arquivo);
console.log('Lista de usuários:', usuarios);