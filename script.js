const formCadastro = document.getElementById("formCadastro");
if (formCadastro) {
    formCadastro.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const usuario = {
            nome,
            email,
            senha
        };
        try {
            const resposta = await fetch(
                "http://127.0.0.1:3000/cadastro",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usuario)
                }
            );
            const dados = await resposta.json();
            alert(dados.mensagem);
            window.location.href = "index.html";
        } catch (erro) {
            console.log(erro);
            alert("Erro ao cadastrar usuário");
        }
    });
}
const formLogin = document.getElementById("formLogin");
if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        try {
            const resposta = await fetch(
                "http://127.0.0.1:3000/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        senha
                    })
                }
            );
            const dados = await resposta.json();
            if (resposta.ok) {
                localStorage.setItem(
                    "usuarioLogado",
                    JSON.stringify(dados.usuario)
                );
                alert(dados.mensagem);
                window.location.href = "dashboard.html";
            } else {
                alert(dados.mensagem);
            }
        } catch (erro) {
            console.log(erro);
            alert("Erro ao fazer login");
        }
    });
}