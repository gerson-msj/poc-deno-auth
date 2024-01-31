import { BaseController, PageController, Context } from "https://deno.land/x/deno_msj_controllers@1.0.0/mod.ts";
import LoginController from "./api/controllers/LoginController.ts";

const controllers = BaseController.enlistHandlers(
    PageController,
    LoginController
);

Deno.serve((request: Request): Promise<Response> => controllers.handle(new Context(request)));