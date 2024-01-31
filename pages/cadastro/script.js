{
    /** @type {HTMLInputElement} */ const nome = document.querySelector("#nome");
    /** @type {HTMLInputElement} */ const senha = document.querySelector("#senha");
    /** @type {HTMLButtonElement} */ const enviar = document.querySelector("#enviar");
    /** @type {HTMLParagraphElement} */ const visor = document.querySelector("#visor");

    function main() {
        enviar.onclick = () => onEnviar();
    }

    async function onEnviar() {

        visor.value = "";

        const login = {
            nome: nome.value,
            senha: senha.value
        };

        const request = await fetch("../api/login", {
            method: "POST",
            body: JSON.stringify(login),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa("deno:api")
            }
        });

        const data = await request.json();

        if (request.ok) {
            localStorage.setItem("nome", nome.value);
            nome.value = "";
            senha.value = "";
            alert("Cadastro realizado com sucesso!");
            location.href = "../login/";
        } else {
            visor.value = data.message;
        }
    }

    main();
}