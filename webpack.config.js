const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.devServer = {
    proxy: {
      '/api': 'http://10.219.175.225:8085/api'
    }
  }

  return config;
};