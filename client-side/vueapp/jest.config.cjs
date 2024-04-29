module.exports = {
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
};