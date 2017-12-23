import asyncio
from tornado.platform.asyncio import AsyncIOMainLoop
import tornado.httpserver
import tornado.ioloop
from mitmproxy.utils import version_check
from proxyserver.web import Application
from proxyserver.master import Master
from proxyserver.configuration import configuration


def start() -> None:
    version_check.check_pyopenssl_version()

    AsyncIOMainLoop().install()
    loop = asyncio.get_event_loop()

    web_options, server = configuration()
    master = Master(web_options, loop, server)

    web_application = Application(master)
    http_server = tornado.httpserver.HTTPServer(web_application)
    http_server.listen(5000, "127.0.0.1")

    tornado_loop = tornado.ioloop.IOLoop.instance()
    tornado_loop.add_callback(master.start)
    tornado.ioloop.PeriodicCallback(lambda: master.tick(timeout=0), 5).start()

    try:
        print("Starting proxy server")
        tornado_loop.start()
    except (KeyboardInterrupt, RuntimeError):
        pass
