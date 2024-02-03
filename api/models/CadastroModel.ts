export default class CadastroModel {
    
    Nome: string;
    Senha: string;
    Token: string | undefined = undefined;
        
    constructor(nome: string, senha: string) {
        this.Nome = nome;
        this.Senha = senha;
    }
}