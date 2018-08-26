/**
 * Middleware responsável por receber as exceções dentro de rotas que utilizam async/await
 * e encaminhar para o express para fazer o tratamento da exceção.
 *
 * @param {*} fn
 */
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}
