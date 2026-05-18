let tentativas = 0;
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

  tentativas++;

  if (tentativas >= 5) {
  mensagem.textContent = "Muitas tentativas. Login bloqueado por 30 segundos.";
  mensagem.style.color = "#ff4d4d";

  const botao = document.querySelector("button");
  botao.disabled = true;
  botao.textContent = "Bloqueado";

  
  let tempoRestante = 30;

const intervalo = setInterval(() => {
  mensagem.textContent =
    "Muitas tentativas. Tente novamente em " +
    tempoRestante + "s";

  tempoRestante--;

  if (tempoRestante < 0) {
    clearInterval(intervalo);

    tentativas = 0;

    botao.disabled = false;
    botao.textContent = "Entrar";

    mensagem.textContent = "Você pode tentar novamente.";
    mensagem.style.color = "#22c55e";
  }

}, 1000);
}

  mensagem.textContent =
    "E-mail ou senha incorretos. Tentativas: " + tentativas;

  mensagem.style.color = "#ff4d4d";
 localStorage.setItem("logado", "true");
  const agora = new Date();
const dataHora = agora.toLocaleString("pt-BR");

localStorage.setItem("ultimoLogin", dataHora);

let historico = JSON.parse(localStorage.getItem("historicoAcessos")) || [];
historico.push(dataHora);

localStorage.setItem("historicoAcessos", JSON.stringify(historico));

window.location.href = "dashboard.html";
  return;
}

 
  
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
  const listaHistorico = document.getElementById("historicoAcessos");
const historico = JSON.parse(localStorage.getItem("historicoAcessos")) || [];

if (listaHistorico) {
  listaHistorico.innerHTML = "";

  historico.forEach(function(acesso) {
    const item = document.createElement("li");
    item.textContent = acesso;
    listaHistorico.appendChild(item);
  });
}
}
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
  const usuario = document.getElementById("usuario");
  const ultimoLogin = localStorage.getItem("ultimoLogin");
  const textoUltimoLogin = document.getElementById("ultimoLogin");

  if (usuarioSalvo && usuario) {
    usuario.textContent = "Bem-vindo, " + usuarioSalvo.nome;
    usuario.style.color = "white";
  }

  if (ultimoLogin && textoUltimoLogin) {
    textoUltimoLogin.textContent = "Último acesso: " + ultimoLogin;
    textoUltimoLogin.style.color = "white";
    textoUltimoLogin.style.fontSize = "13px";
  }



function logout() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", carregarUsuario);