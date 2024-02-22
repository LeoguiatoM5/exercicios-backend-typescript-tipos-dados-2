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

function listarUsuarios(arquivo: string, profissaoFiltrar?: string): Usuario[] {
    const conteudoDoArquivo = lerArquivoJSON(arquivo);
    let usuarios: Usuario[] = conteudoDoArquivo.usuarios || [];

    if (profissaoFiltrar) {
        usuarios = usuarios.filter(usuario => usuario.profissao === profissaoFiltrar);
    }

    return usuarios;
}

const arquivo = './bd.json';

const profissaoFiltrar = 'Desenvolvedor';
const usuariosFiltrados = listarUsuarios(arquivo, profissaoFiltrar);
console.log('Usuários com profissão de Desenvolvedor:', usuariosFiltrados);