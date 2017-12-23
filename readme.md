# debugProxy 

debugProxy is a web UI for [mitmproxy][mitmproxy]. It's also the UI for [debugproxy.com][debugproxy].

_Note: The server implementation for this project is currently incomplete and
many of the features in the UI are not yet supported by the server. Currently
requests can be passivly viewed, but intercepting and modifying requests is not
implemented. The initial goal is to get the server to feature parity with
debugproxy.com and build a package that can be easily installed with `pip`._

The UI looks something like this:

![debugproxy screenshort][screenshot]

## Development

### Proxy UI

Setup the environment

```
cd proxyui
npm install
```

Run the UI dev server

```
npm run
```

### Proxy server

Setup the environment

```
python3 -m venv venv
. venv/bin/activate
pip3 install -U pip setuptools
pip3 install -r requirements.txt
python setup.py develop
```

Run the server.

```
./venv/bin/debugproxy
```

The web interface is:
  
  [http://localhost:5000][web_url]

The proxy interface is:

  [localhost:8080][proxy_url]

To send a basic request through the proxy run:

```
curl http://example.com --proxy localhost:8080
```

[debugproxy]: https://debugproxy.com
[screenshort]: https://debugproxy.com/static/img/debugTechBikers.png
[web_url]: http://localhost:5000
[proxy_url]: localhost:8080
[mitmproxy]: https://mitmproxy.org/
