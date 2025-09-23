// CRACO config to restrict webpack-dev-server CORS headers in development
// This prevents Access-Control-Allow-Origin: * being sent from port 3000
module.exports = {
  // Disable dev source maps to avoid leaking private IPs in bundle.js
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.devtool = false;
      // Ensure style-loader adds a CSP nonce to injected <style> tags in dev
      try {
        const NONCE = 'dev-nonce-2025-09-23';
        const patchStyleLoader = (rule) => {
          if (!rule) return;
          const uses = rule.use || rule.loader ? [rule] : rule.oneOf || [];
          const processUseItem = (useItem) => {
            if (!useItem) return;
            const loaderPath = useItem.loader || useItem;
            if (
              typeof loaderPath === 'string' &&
              loaderPath.includes('style-loader')
            ) {
              // Convert string loader to object form if needed
              if (typeof useItem === 'string') {
                const idx = rule.use.indexOf(useItem);
                rule.use[idx] = {
                  loader: useItem,
                  options: { attributes: { nonce: NONCE } },
                };
              } else {
                useItem.options = useItem.options || {};
                const attrs = useItem.options.attributes || {};
                useItem.options.attributes = { ...attrs, nonce: NONCE };
              }
            }
          };

          if (Array.isArray(rule.use)) {
            rule.use.forEach(processUseItem);
          }
          if (Array.isArray(rule.oneOf)) {
            rule.oneOf.forEach((r) => {
              if (Array.isArray(r.use)) r.use.forEach(processUseItem);
            });
          }
        };

        if (webpackConfig.module && Array.isArray(webpackConfig.module.rules)) {
          webpackConfig.module.rules.forEach((r) => {
            // CRA keeps rules under oneOf; patch both directly and nested
            patchStyleLoader(r);
            if (Array.isArray(r.oneOf)) {
              r.oneOf.forEach((rr) => patchStyleLoader(rr));
            }
          });
        }
      } catch (e) {
        // Non-fatal in case of structure mismatch; styles may be blocked by CSP if nonce isn't applied
      }
      return webpackConfig;
    },
  },
  devServer: (devServerConfig) => {
    // Force dev server to bind to localhost to avoid embedding private IPs
    devServerConfig.host = "localhost";
    if (!devServerConfig.client) devServerConfig.client = {};
    if (!devServerConfig.client.webSocketURL)
      devServerConfig.client.webSocketURL = {};
    devServerConfig.client.webSocketURL.hostname = "localhost";
    // Optionally pin the port if needed
    // devServerConfig.client.webSocketURL.port = 3000;
    // If port is dynamic, leave it; CRA defaults to 3000
    // devServerConfig.client.webSocketURL.port = devServerConfig.port || 3000;

    devServerConfig.headers = {
      // Restrict to same-origin in dev instead of wildcard
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Credentials": "true",
      // Anti-MIME sniffing
      "X-Content-Type-Options": "nosniff",
      // Anti-clickjacking
      "X-Frame-Options": "SAMEORIGIN",
      // Full CSP to avoid fallback-based allowances in scanners
      "Content-Security-Policy": [
        "default-src 'self'",
        "base-uri 'self'",
        "block-all-mixed-content",
        "upgrade-insecure-requests",
        "connect-src 'self' http://localhost:5000 ws://localhost:3000 https://accounts.google.com https://www.googleapis.com",
        "font-src 'self' data:",
        "form-action 'self'",
        "frame-ancestors 'self'",
        "frame-src 'self' https://accounts.google.com",
        "img-src 'self' data: blob: https://ssl.gstatic.com https://accounts.google.com",
        "manifest-src 'self'",
        "media-src 'self' data:",
        "object-src 'none'",
  "script-src 'self' https://accounts.google.com https://apis.google.com",
  "style-src 'self' 'nonce-dev-nonce-2025-09-23'",
  "style-src-elem 'self' 'nonce-dev-nonce-2025-09-23'",
        "worker-src 'self' blob:",
      ].join('; '),
    };

    // Remove X-Powered-By header and disable Express-powered header on dev server
    const originalSetup = devServerConfig.setupMiddlewares;
    devServerConfig.setupMiddlewares = (middlewares, server) => {
      if (server && server.app) {
        try {
          // Express app available via server.app
          server.app.disable("x-powered-by");
          server.app.use((req, res, next) => {
            res.removeHeader("X-Powered-By");
            next();
          });
        } catch (_) {}
      }
      return originalSetup ? originalSetup(middlewares, server) : middlewares;
    };
    return devServerConfig;
  },
};
