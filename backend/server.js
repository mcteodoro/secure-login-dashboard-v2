require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

// CONEXÃO COM MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((erro) => console.log("Erro ao conectar MongoDB:", erro));

// SCHEMA
const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

// TESTE
app.get("/", (req, res) => {
  res.send("Backend online funcionando");
});

// CADASTRO
app.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // VERIFICA SE USUÁRIO EXISTE
    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({
        mensagem: "Usuário já existe"
      });
    }

    // CRIPTOGRAFAR SENHA
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // CRIAR USUÁRIO
    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada
    });

    await novoUsuario.save();

    res.json({
      mensagem: "Usuário cadastrado com sucesso"
    });

  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      mensagem: "Erro ao cadastrar usuário"
    });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // BUSCAR USUÁRIO
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        mensagem: "E-mail ou senha incorretos"
      });
    }

    // COMPARAR SENHA
    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        mensagem: "E-mail ou senha incorretos"
      });
    }

    res.json({
      mensagem: "Login realizado com sucesso",
      usuario: {
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      mensagem: "Erro ao fazer login"
    });
  }
});

// PORTA
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});