const validateUsername = function(v) {
  return /^[A-Za-z0-9_.-]+$/.test(v);
}

const validateEmail = function(v) {
  return /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(v);
}

module.exports = {
  validateUsername,
  validateEmail,
}