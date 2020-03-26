const [ development, production ] = [ 'development', 'production' ]

function isProduction (mode) {
  return mode === production
}

module.exports = {
  development,
  production,
  isProduction
}