const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://bufxnnnnoyeqliigzmny.supabase.co";

const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_API_KEY);

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios!" });
  }

  try {
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Usuário registrado com sucesso", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro interno do servidor: " + error.message });
  }
};

// Função de login de usuário
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Erro ao fazer login Supabase:", error.message);
      return res.status(401).json({ error: "Credenciais inválidas" }); // Retorna status 401 e mensagem de erro
    }

    console.log("Login feito com sucesso:", data);
    return res.status(200).json({
      message: "Login bem-sucedido",
      user: data.user, // Inclui os dados do usuário logado
      token: data.session?.access_token, // Retorna o token, se disponível
    });
  } catch (err) {
    console.error("Erro inesperado:", err);
    return res.status(500).json({ error: "Erro interno do servidor" }); // Captura erros inesperados
  } finally {
    console.log("Finalizado");
  }
};

// Função de logout de usuário
exports.logoutUser = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Logout realizado com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro interno do servidor: " + error.message });
  }
};
