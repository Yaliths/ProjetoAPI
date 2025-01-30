module.exports = (req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next(); // Chama o próximo middleware ou a rota
};
