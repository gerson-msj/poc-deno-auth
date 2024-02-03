import {
    BaseController,
    Context,
} from "https://deno.land/x/deno_msj_controllers@1.0.0/mod.ts";

import CadastroModel from "../models/CadastroModel.ts";


export default class LoginController extends BaseController {

    private cadastros: CadastroModel[] = [];

    constructor(cadastros: CadastroModel[]) {
        super();
        this.cadastros = cadastros;
    }

    public handle(context: Context): Promise<Response> {

        if (context.url.pathname !== "/api/login") {
            return super.handle(context);
        }

        if (context.request.method === "POST") {
            return this.post(context);
        } else {
            return super.handle(context);
        }
    }

    private async post(context: Context): Promise<Response> {

        try {
            const data = await context.request.json();
            const login = new CadastroModel(data.nome, data.senha);
            const cadastro = this.cadastros.find(c => c.Nome == login.Nome && c.Senha == login.Senha);
            if(!cadastro) {
                return this.badRequest("O usuário ou senha informado é inválido!");
            }



            return this.ok(`Cadastro realizado com sucesso. Usuários cadastrados: ${this.cadastros.length}.`);
        } catch (error) {
            return this.badRequest(error);
        }
    }

    private badRequest(message: string) : Response {
        return new Response(JSON.stringify({message: message}), { status: 400, headers: { "content-type": "application/json; charset=utf-8" } });
    }

    private ok(message: string) : Response {
        return new Response(JSON.stringify({message: message}), { status: 200, headers: { "content-type": "application/json; charset=utf-8" } });
    }
}
