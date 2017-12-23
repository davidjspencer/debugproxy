# debugProxy 

debugProxy is a web UI for mitmproxy.

## Development

### Proxy UI

Setup the environment

  cd proxyui
  npm install

Run the UI dev server

  npm run

### Proxy server

Setup the environment

  python3 -m venv venv
  . venv/bin/activate
  pip3 install -U pip setuptools
  pip3 install -r requirements.txt
  python setup.py develop

Run the server.

  ./venv/bin/debugproxy

The web interface is:
  
  http://localhost:5000

The proxy interface is:

  localhost:8080

To send a basic request through the proxy run:

  curl http://example.com --proxy localhost:8080
