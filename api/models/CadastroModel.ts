export default class CadastroModel {
    
    Nome: string;
    Senha: string;
        
    constructor(nome: string, senha: string) {
        this.Nome = nome;
        this.Senha = senha;
    }
}