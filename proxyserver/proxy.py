import mitmproxy
from mitmproxy.tools.web.app import flow_to_json
from proxyserver.web import UpdatesHandler

class Proxy:
    def __init__(self, loop) -> None:
        self.loop = loop
        self.connections = dict()
        self.intercepts = dict()

    def request(self, flow: mitmproxy.flow.Flow) -> None:
        print("request")
        UpdatesHandler.broadcast(flow_to_json(flow))
        pass

    def response(self, flow: mitmproxy.flow.Flow) -> None:
        print("response")
        UpdatesHandler.broadcast(flow_to_json(flow))
        pass

