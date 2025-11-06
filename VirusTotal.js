javascript:(function() {
  function base64urlEncode(str) {
    return btoa(str).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  }

  function cleanURL(url) {
    try {
      const u = new URL(url);
      return u.origin + u.pathname;
    } catch (e) {
      return null;
    }
  }

  const whitelist = [
    'google.com',
    'microsoft.com',
    'github.com',
    'mozilla.org',
    'apple.com',
    'amazon.com',
    'facebook.com',
    'linkedin.com',
    'twitter.com',
    'youtube.com',
    'wikipedia.org',
    'cloudflare.com',
    'bing.com',
    'yahoo.com',
    'duckduckgo.com',
    'reddit.com',
    'stackoverflow.com',
    'paypal.com',
    'dropbox.com',
    'zoom.us',
    'slack.com',
    'skype.com',
    'adobe.com',
    'intel.com',
    'nvidia.com',
    'cnn.com',
    'bbc.co.uk',
    'nytimes.com',
    'reuters.com',
    'bloomberg.com',
    'forbes.com',
    'medium.com',
    'quora.com',
    'salesforce.com',
    'oracle.com',
    'netflix.com',
    'spotify.com',
    'whatsapp.com',
    'telegram.org',
    'tiktok.com',
    'roblox.com',
    'steamcommunity.com',
    'microsoftonline.com',
    'office.com',
    'live.com',
    'outlook.com',
    'icloud.com',
    'zoom.com',
    'box.com',
    'weebly.com',
    'wix.com',
    'wordpress.com',
    'godaddy.com',
    'namecheap.com'
  ];

  function isWhitelisted(url) {
    try {
      const hostname = new URL(url).hostname;
      return whitelist.some(domain =>
        hostname === domain || hostname.endsWith('.' + domain)
      );
    } catch (e) {
      return false;
    }
  }

  const htmlText = document.documentElement.outerHTML;
  const urlRegex = /\bhttps?:\/\/[^\s"'<>]+/g;
  const matches = [...htmlText.matchAll(urlRegex)];

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '10px';
  container.style.right = '10px';
  container.style.maxHeight = '90vh';
  container.style.overflowY = 'auto';
  container.style.background = 'white';
  container.style.border = '1px solid #ccc';
  container.style.padding = '10px';
  container.style.zIndex = 99999;
  container.style.fontSize = '14px';
  container.style.lineHeight = '1.6';
  container.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
  container.style.width = '400px';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '❌ Close';
  closeBtn.style.float = 'right';
  closeBtn.style.marginBottom = '10px';
  closeBtn.onclick = () => container.remove();
  container.appendChild(closeBtn);

  const title = document.createElement('div');
  title.textContent = '🛡️ Click to check URLs on VirusTotal by @dylvie';
  title.style.fontWeight = 'bold';
  title.style.marginBottom = '8px';
  title.style.color = 'black';
  container.appendChild(title);

  const seen = new Set();
  matches.forEach(match => {
    const raw = match[0];
    const cleaned = cleanURL(raw);
    if (cleaned && !seen.has(cleaned) && !isWhitelisted(cleaned)) {
      seen.add(cleaned);
      const line = document.createElement('div');
      const vtLink = document.createElement('a');
      vtLink.href = `https://www.virustotal.com/gui/url/${base64urlEncode(cleaned)}/detection`;
      vtLink.textContent = cleaned;
      vtLink.target = '_blank';
      vtLink.style.wordBreak = 'break-word';
      line.appendChild(vtLink);
      container.appendChild(line);
    }
  });

  if (seen.size === 0) {
    const msg = document.createElement('div');
    msg.textContent = 'No URLs found in HTML.';
    container.appendChild(msg);
  }

  document.body.appendChild(container);
})();
