import {
    BaseController,
    Context,
} from "https://deno.land/x/deno_msj_controllers@1.0.0/mod.ts";

import CadastroModel from "../models/CadastroModel.ts";


export default class CadastroController extends BaseController {

    private cadastros: CadastroModel[] = [];

    constructor(cadastros: CadastroModel[]) {
        super();
        this.cadastros = cadastros;
    }

    public handle(context: Context): Promise<Response> {

        if (context.url.pathname !== "/api/cadastro") {
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
            const cadastro = new CadastroModel(data.nome, data.senha);
            if(this.cadastros.some(c => c.Nome == cadastro.Nome)) {
                return this.badRequest("O usuário informado já existe!");
            }

            this.cadastros.push(cadastro);

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
