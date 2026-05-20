const API_URL = "https://secure-login-dashboard-v2.onrender.com";

async function cadastrar() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch(`${API_URL}/cadastro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        email,
        senha
      })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert("Usuário cadastrado com sucesso");

      window.location.href = "index.html";
    } else {
      alert(dados.mensagem);
    }

  } catch (erro) {
    console.log(erro);
    alert("Erro ao cadastrar usuário");
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        senha
      })
    });

    const dados = await resposta.json();

    if (resposta.ok) {

      localStorage.setItem(
        "usuario",
        JSON.stringify(dados.usuario)
      );

      window.location.href = "dashboard.html";

    } else {
      alert(dados.mensagem);
    }

  } catch (erro) {
    console.log(erro);
    alert("Erro ao fazer login");
  }
}

function carregarDashboard() {

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("nomeUsuario").innerText =
    usuario.nome;

  document.getElementById("emailUsuario").innerText =
    usuario.email;
}

function sair() {
  localStorage.removeItem("usuario");

  window.location.href = "index.html";
}
function mostrarSenha(id) {
  const input = document.getElementById(id);

  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}