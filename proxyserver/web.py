import json
import os.path
import tornado.web
import tornado.websocket
from proxyserver.intercepts import Intercept


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


class InterceptHandler(tornado.web.RequestHandler):

    def get(self):
        intercepts = self.application.intercepts.all()
        response = {
            "intercepts": intercepts
        }
        self.write(json.dumps(response))


class CreateInterceptHandler(tornado.web.RequestHandler):

    def post(self):
        request = json.loads(self.request.body.decode('utf-8'))
        intercept = Intercept(request["query"])
        result = self.application.intercepts.add(intercept)

        response = {
          "intercept": intercept.to_json(),
          "success": result
        }

        self.write(json.dumps(response))


class UpdateInterceptHandler(tornado.web.RequestHandler):

    def post(self, intercept_id):
        request = json.loads(self.request.body.decode('utf-8'))
        intercept = Intercept(query=request["query"], id=intercept_id)
        result = self.application.intercepts.update(intercept)

        response = {
          "intercept": intercept.to_json(),
          "success": result
        }

        self.write(json.dumps(response))


class DeleteInterceptHandler(tornado.web.RequestHandler):

    def post(self, intercept_id):
        result = self.application.intercepts.delete(intercept_id)
        response = {
          "success": result
        }
        self.write(json.dumps(response))


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html", csrf_token=self.xsrf_token)


class Application(tornado.web.Application):
    def __init__(self, master=None, intercepts=None):
        self.master = master
        self.intercepts = intercepts

        handlers = [
            (r"/", IndexHandler),
            (r"/updates", UpdatesHandler),
            (r"/intercepts/all/1", InterceptHandler),
            (r"/intercepts/create/1", CreateInterceptHandler),
            (r"/intercepts/delete/1/(.*)", DeleteInterceptHandler),
            (r"/intercepts/update/1/(.*)", UpdateInterceptHandler),
            (r"/sessions/ping/1", PingHandler)
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
