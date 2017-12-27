import pytest
from proxyserver.proxy import Proxy
from unittest.mock import Mock
from mitmproxy.test.tflow import tflow
from mitmproxy.tools.web.app import flow_to_json


@pytest.mark.gen_test
def test_proxy_broadcasts_request(io_loop):
    broadcast = Mock()
    proxy = Proxy(io_loop, broadcast)
    flow = tflow(client_conn=True, server_conn=True, req=True, resp=True, err=True)
    proxy.request(flow)
    broadcast.assert_called_with(flow_to_json(flow))


@pytest.mark.gen_test
def test_proxy_broadcasts_response(io_loop):
    broadcast = Mock()
    proxy = Proxy(io_loop, broadcast)
    flow = tflow(client_conn=True, server_conn=True, req=True, resp=True, err=True)
    proxy.response(flow)
    broadcast.assert_called_with(flow_to_json(flow))
