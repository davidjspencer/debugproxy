import tornado.httpserver
import tornado.ioloop
import mitmproxy
import mitmproxy.master
from mitmproxy.options import Options  # noqa
from proxyserver.web import Application
from proxyserver.proxy import Proxy
from typing import Any


class Master(mitmproxy.master.Master):
    def __init__(self,
                 options: Any,
                 loop: Any,
                 server: mitmproxy.proxy.server.ProxyServer) -> None:

        super().__init__(options, server)

        self.loop = loop

        self.proxy_server_port = 8080

        self.proxy = Proxy(loop)
        self.addons.add(self.proxy)
