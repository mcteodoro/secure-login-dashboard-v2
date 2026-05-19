const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let usuarios = [];

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.post("/cadastro", (req, res) => {
  const usuario = req.body;

  usuarios.push(usuario);

  res.json({
    mensagem: "Usuário cadastrado com sucesso",
    usuario: usuario
  });
});
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const usuario = usuarios.find(user =>
    user.email === email && user.senha === senha
  );

  if (!usuario) {
    return res.status(401).json({
      mensagem: "E-mail ou senha incorretos"
    });
  }

  res.json({
    mensagem: "Login realizado com sucesso",
    usuario
  });
});
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});