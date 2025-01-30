const { getWeatherAndPlaces } = require("./service");
const {
  registerUserService,
  loginUserService,
  logoutUserService,
} = require("./userService");

// Função para obter lugares baseados no clima
exports.getAllplaces = async (req, res) => {
  try {
    const { city, country, date } = req.params; // Recebe cidade, país e data dos parâmetros
    const response = await getWeatherAndPlaces(city, country, date); // Obtém clima e lugares

    if (!response) {
      return res.status(404).json({ error: "Nenhum dado encontrado." });
    }

    // Verifica se as informações de clima e lugares estão disponíveis no retorno
    const { weatherDescription, temp, results } = response;

    // Resposta enviada para o frontend com dados úteis
    res.status(200).json({
      message: "Dados obtidos com sucesso.",
      places: results, // Lista de lugares
      weather: {
        description: weatherDescription, // Descrição do clima
        temperature: temp, // Temperatura
      },
    });
  } catch (error) {
    console.error("Erro ao obter dados:", error.message);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
// Função para registrar um novo usuário
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const response = await registerUserService(username, email, password);
    res.status(201).json(response);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Função para fazer login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginUserService(email, password);
    res.status(200).json(response);
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    res.status(401).json({ error: error.message });
  }
};

// Função para fazer logout
exports.logoutUser = async (req, res) => {
  try {
    const response = await logoutUserService();
    res.status(200).json(response);
  } catch (error) {
    console.error("Erro ao fazer logout:", error.message);
    res.status(500).json({ error: error.message });
  }
};
