{
    /** @type {HTMLInputElement} */ const nome = document.querySelector("#nome");
    /** @type {HTMLInputElement} */ const senha = document.querySelector("#senha");
    /** @type {HTMLButtonElement} */ const autenticar = document.querySelector("#autenticar");
    /** @type {HTMLParagraphElement} */ const visor = document.querySelector("#visor");

    function main() {
        autenticar.onclick = () => onAutenticar();
        nome.value = localStorage.getItem("nome") ?? "";
        senha.value = "";
    }

    async function onAutenticar() {

        visor.innertext = "";

        const login = {
            nome: nome.value,
            senha: senha.value
        };

        const request = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(login),
            headers: { "Content-Type": "application/json" }
        });

        const data = await request.json();

        if (request.ok) {
            nome.value = "";
            senha.value = "";
            alert(data.message);
            localStorage.setItem("token", data.message);
            location.href = "../painel/";
        } else {
            visor.innerText = data.message;
        }
    }

    main();
}