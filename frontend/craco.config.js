// CRACO config to restrict webpack-dev-server CORS headers in development
// This prevents Access-Control-Allow-Origin: * being sent from port 3000
module.exports = {
  devServer: (devServerConfig) => {
    devServerConfig.headers = {
      // Restrict to same-origin in dev instead of wildcard
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    };
    return devServerConfig;
  }
};
