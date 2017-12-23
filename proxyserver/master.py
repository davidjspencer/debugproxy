import tornado.httpserver
import tornado.ioloop
import mitmproxy
import mitmproxy.master
from mitmproxy.options import Options  # noqa
from proxyserver.web import Application
from proxyserver.proxy import Proxy
from typing import Any

import asyncio
from tornado.platform.asyncio import AsyncIOMainLoop

AsyncIOMainLoop().install()

class Master(mitmproxy.master.Master):
    def __init__(self,
                 options: Any,
                 server: mitmproxy.proxy.server.ProxyServer) -> None:

        super().__init__(options, server)

        self.app = Application(self)

        self.proxy_server_port = 8080
        #self.addons.add(*default_addons())


    def run(self) -> None:
        loop = asyncio.get_event_loop()
        self.loop = loop

        iol = tornado.ioloop.IOLoop.instance()

        http_server = tornado.httpserver.HTTPServer(self.app)
        http_server.listen(5000, "127.0.0.1")

        iol.add_callback(self.start)
        tornado.ioloop.PeriodicCallback(lambda: self.tick(timeout=0), 5).start()

        self.proxy = Proxy(loop)
        self.addons.add(self.proxy)

        try:
            print("Starting proxy server")
            iol.start()
        except KeyboardInterrupt:
            self.shutdown()
