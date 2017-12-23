import json
import os.path
import tornado.web
import tornado.websocket


class UpdatesHandler(tornado.websocket.WebSocketHandler):
    connections = set()

    def open(self):
        self.connections.add(self)

    def on_close(self):
        self.connections.remove(self)

    @classmethod
    def broadcast(cls, message):
        message = json.dumps(message, ensure_ascii=False).encode("utf8", "surrogateescape")
        for conn in cls.connections:
            try:
                conn.write_message(message)
            except Exception:
                print("Error sending message")


class PingHandler(tornado.web.RequestHandler):
    def get(self):
        response = {
                "csrf_token":  self.xsrf_token.decode("utf-8"),
                "success": True
        }
        self.write(json.dumps(response))

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html", csrf_token=self.xsrf_token)


class Application(tornado.web.Application):
    def __init__(self, master):
        self.master = master
        handlers = [
            (r"/", IndexHandler),
            (r"/updates", UpdatesHandler),
            (r"/sessions/ping/", PingHandler)
        ]
        settings = dict(
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            xsrf_cookies=True,
            cookie_secret=os.urandom(256),
            debug=True,
            autoreload=True,
        )
        super().__init__(handlers, **settings)
