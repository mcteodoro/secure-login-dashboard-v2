function fazerLogin() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const mensagem = document.getElementById("mensagem");

  if (email === "" || senha === "") {
    mensagem.textContent = "Preencha todos os campos.";
   mensagem.style.color = "#ff4d4d";
    return;
  }

  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

  if (!usuarioSalvo) {
    mensagem.textContent = "Nenhum usuário cadastrado.";
    mensagem.style.color = "#ff4d4d";
    return;
  }

  if (email !== usuarioSalvo.email || senha !== usuarioSalvo.senha) {
    mensagem.textContent = "E-mail ou senha incorretos.";
mensagem.style.color = "#ff4d4d";
    return;
  }

  localStorage.setItem("logado", "true");
  window.location.href = "dashboard.html";
}

function cadastrar() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmar = document.getElementById("confirmar").value;
  const mensagem = document.getElementById("mensagem");

  if (!nome || !email || !senha || !confirmar) {
    mensagem.textContent = "Preencha todos os campos.";
    mensagem.style.color = "#ff4d4d";
    return;
  }

  if (!senhaForte(senha)) {
    mensagem.textContent = "A senha precisa ter 8 caracteres, letra maiúscula, número e símbolo.";
     mensagem.style.color = "#ff4d4d";
    return;
  }

  if (senha !== confirmar) {
    mensagem.textContent = "As senhas não coincidem.";
     mensagem.style.color = "#ff4d4d";
    return;
  }

  const usuario = {
    nome: nome,
    email: email,
    senha: senha
  };

  localStorage.setItem("usuario", JSON.stringify(usuario));

  mensagem.textContent = "Cadastro realizado com sucesso!";
mensagem.style.color = "#22c55e";
}

function senhaForte(senha) {
  const temMaiuscula = /[A-Z]/.test(senha);
  const temNumero = /[0-9]/.test(senha);
  const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

  return senha.length >= 8 && temMaiuscula && temNumero && temEspecial;
}

function carregarUsuario() {
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
  const usuario = document.getElementById("usuario");

  if (usuarioSalvo && usuario) {
    usuario.textContent = "Bem-vindo, " + usuarioSalvo.nome;
    usuario.style.color = "white";
  }
}

function logout() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", carregarUsuario);