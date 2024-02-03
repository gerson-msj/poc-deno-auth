import { PageController, Context } from "https://deno.land/x/deno_msj_controllers@1.0.0/mod.ts";
import CadastroController from "./api/controllers/CadastroController.ts";
import CadastroModel from "./api/models/CadastroModel.ts";

const pageController = new PageController();
const cadastros: CadastroModel[] = [];

Deno.serve((request: Request): Promise<Response> => {

    const cadastroController = new CadastroController(cadastros);
    
    pageController
        .setNext(cadastroController);
    
    return pageController.handle(new Context(request))
});