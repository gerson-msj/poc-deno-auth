import {
    BaseController,
    Context,
} from "https://deno.land/x/deno_msj_controllers@1.0.0/mod.ts";

export default class LoginController extends BaseController {

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


// headers origin referer

    private post(context: Context): Promise<Response> {

        console.log(context.request);

        return Promise.resolve<Response>(
            new Response(JSON.stringify({ message: "" }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }),
        );
    }
}
