require("dotenv").config();
const path = require("path");

app.use(express.static(path.join(__dirname, "../")));

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((erro) => console.log("Erro ao conectar MongoDB:", erro));

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

app.get("/", (req, res) => {
  res.send("Backend online funcionando");
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

app.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  const usuarioExistente = await Usuario.findOne({ email });

  if (usuarioExistente) {
    return res.status(400).json({
      mensagem: "E-mail já cadastrado"
    });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const usuario = await Usuario.create({
    nome,
    email,
    senha: senhaCriptografada
  });

  res.json({
    mensagem: "Usuário cadastrado com sucesso",
    usuario
  });
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    return res.status(401).json({
      mensagem: "E-mail ou senha incorretos"
    });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
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