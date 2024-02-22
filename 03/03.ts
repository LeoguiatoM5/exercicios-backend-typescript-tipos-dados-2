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

function atualizarUsuario(cpf: string, novosDados: Partial<Usuario>, arquivo: string): Usuario | null {
    const conteudoDoArquivo = lerArquivoJSON(arquivo);
    const usuarios: Usuario[] = conteudoDoArquivo.usuarios || [];

    const usuarioIndex = usuarios.findIndex(usuario => usuario.cpf === cpf);
    if (usuarioIndex === -1) {
        return null; 
    }

    usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...novosDados };
    conteudoDoArquivo.usuarios = usuarios;
    escreverArquivoJSON(arquivo, conteudoDoArquivo);

    return usuarios[usuarioIndex];
}


function detalharUsuario(cpf: string, arquivo: string): Usuario | null {
    const conteudoDoArquivo = lerArquivoJSON(arquivo);
    const usuarios: Usuario[] = conteudoDoArquivo.usuarios || [];

    const usuario = usuarios.find(usuario => usuario.cpf === cpf);
    return usuario || null;
}

const arquivo = './bd.json';


const cpfUsuarioAtualizar = '123.456.789-00';
const novosDadosUsuario: Partial<Usuario> = {
    profissao: 'Analista de Dados',
    endereco: {
        cep: '98765-432',
        rua: 'Rua Nova',
        bairro: 'Bairro Novo',
        cidade: 'Cidade Nova'
    }
};
const usuarioAtualizado = atualizarUsuario(cpfUsuarioAtualizar, novosDadosUsuario, arquivo);
if (usuarioAtualizado) {
    console.log('Usuário atualizado:', usuarioAtualizado);
} else {
    console.log('Usuário não encontrado.');
}


const cpfUsuarioDetalhar = '123.456.789-00';
const usuarioDetalhado = detalharUsuario(cpfUsuarioDetalhar, arquivo);
if (usuarioDetalhado) {
    console.log('Detalhes do usuário:', usuarioDetalhado);
} else {
    console.log('Usuário não encontrado.');
}