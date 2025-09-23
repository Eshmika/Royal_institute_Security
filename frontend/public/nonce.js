// Set a fixed nonce for development so CSP can allow style tags injected by style-loader
// Note: For production, generate a unique nonce per response and inject it server-side.
(function () {
  const NONCE = 'dev-nonce-2025-09-23';
  window.__webpack_nonce__ = NONCE;

  // Patch createElement to set nonce on created <style> tags
  try {
    const origCreateElement = Document.prototype.createElement;
    Document.prototype.createElement = function (tagName, options) {
      const el = origCreateElement.call(this, tagName, options);
      if (typeof tagName === 'string' && tagName.toLowerCase() === 'style') {
        try { el.setAttribute('nonce', NONCE); } catch (_) {}
      }
      return el;
    };
  } catch (_) {}

  // Observe DOM insertions to add nonce to any <style> elements added without one
  try {
    const addNonceIfStyle = (node) => {
      if (!node) return;
      if (node.nodeType !== 1) return; // ELEMENT_NODE
      if (node.tagName && node.tagName.toLowerCase() === 'style') {
        if (!node.getAttribute('nonce')) {
          try { node.setAttribute('nonce', NONCE); } catch (_) {}
        }
      }
      // In case of document fragments or containers with nested styles
      const styles = node.querySelectorAll ? node.querySelectorAll('style:not([nonce])') : [];
      styles.forEach((s) => {
        try { s.setAttribute('nonce', NONCE); } catch (_) {}
      });
    };

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.addedNodes && m.addedNodes.length) {
          m.addedNodes.forEach(addNonceIfStyle);
        }
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  } catch (_) {}
})();
