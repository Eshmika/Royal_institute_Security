// CRACO config to restrict webpack-dev-server CORS headers in development
// This prevents Access-Control-Allow-Origin: * being sent from port 3000
module.exports = {
  devServer: (devServerConfig) => {
    // Force dev server to bind to localhost to avoid embedding private IPs
    devServerConfig.host = "localhost";
    if (!devServerConfig.client) devServerConfig.client = {};
    if (!devServerConfig.client.webSocketURL)
      devServerConfig.client.webSocketURL = {};
    devServerConfig.client.webSocketURL.hostname = "localhost";
    // If port is dynamic, leave it; CRA defaults to 3000
    // devServerConfig.client.webSocketURL.port = devServerConfig.port || 3000;

    devServerConfig.headers = {
      // Restrict to same-origin in dev instead of wildcard
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Credentials": "true",
      // Anti-clickjacking
      "X-Frame-Options": "SAMEORIGIN",
      // Prefer CSP frame-ancestors; safe for modern browsers
      "Content-Security-Policy": "frame-ancestors 'self'",
    };
    return devServerConfig;
  },
};
