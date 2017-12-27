import pytest
import tornado.web
import json
from proxyserver.web import Application
from proxyserver.intercepts import Intercepts, Intercept
from tornado.httpclient import HTTPRequest
from tornado import gen
from proxyserver.web import UpdatesHandler


@pytest.fixture
def app():
    intercepts = Intercepts()
    return Application(intercepts=intercepts)


@pytest.mark.gen_test
def test_intercepts_all_with_no_intercepts(http_client, base_url, app):
    response = yield http_client.fetch(base_url + "/intercepts/all/1")

    expected = {
        "intercepts": []
    }

    assert response.code == 200
    assert json.loads(response.body) == expected


@pytest.mark.gen_test
def test_intercepts_all_returns_intercepts(http_client, base_url, app):
    app.intercepts.add(Intercept(query="some-query"))
    app.intercepts.add(Intercept(query="some-query"))
    app.intercepts.add(Intercept(query="some-query"))

    response = yield http_client.fetch(base_url + "/intercepts/all/1")

    assert response.code == 200
    response_data = json.loads(response.body)
    assert len(response_data["intercepts"]) == 3


@pytest.mark.gen_test
def test_ping_returns_csrf_token(http_client, base_url, app):
    response = yield http_client.fetch(base_url + "/sessions/ping/1")

    assert response.code == 200
    response_data = json.loads(response.body)
    assert response_data["success"] is True
    assert response_data["csrf_token"] is not None
    assert len(response_data["csrf_token"]) > 0


def get_csrf_token(http_client, base_url):
    ping_response = yield http_client.fetch(base_url + "/sessions/ping/1")
    ping_response_data = json.loads(ping_response.body)
    csrf_token = ping_response_data["csrf_token"]
    return csrf_token


@gen.coroutine
def get_auth_headers(http_client, base_url):
    ping_response = yield http_client.fetch(base_url + "/sessions/ping/1")
    ping_response_data = json.loads(ping_response.body)
    csrf_token = ping_response_data["csrf_token"]

    print(csrf_token)

    headers = {
        "X-CSRFToken": csrf_token,
        "Cookie": "_xsrf=" + csrf_token
    }
    return headers


@pytest.mark.gen_test
def test_adding_an_intercept(http_client, base_url, app):
    body = {
        "query": "some-query"
    }

    headers = yield get_auth_headers(http_client, base_url)
    request = HTTPRequest(base_url + "/intercepts/create/1", method="POST", body=json.dumps(body), headers=headers)
    response = yield http_client.fetch(request)

    assert response.code == 200
    response_data = json.loads(response.body)
    assert response_data["success"] == True
    assert len(app.intercepts.all()) == 1
    assert app.intercepts.all()[0]["query"] == "some-query"



@pytest.mark.gen_test
def test_intercepts_delete_intercept(http_client, base_url, app):

    intercept = Intercept(query="some-query")
    app.intercepts.add(intercept)

    headers = yield get_auth_headers(http_client, base_url)
    request = HTTPRequest(base_url + "/intercepts/delete/1/" + intercept.id, method="POST", body="", headers=headers)
    response = yield http_client.fetch(request)

    assert response.code == 200
    response_data = json.loads(response.body)
    assert response_data["success"] == True
    assert len(app.intercepts.all()) == 0


@pytest.mark.gen_test
def test_intercepts_modify_intercept(http_client, base_url, app):

    intercept = Intercept(query="some-query")
    app.intercepts.add(intercept)

    body = {
        "id": intercept.id,
        "query": "updated-query"
    }

    headers = yield get_auth_headers(http_client, base_url)
    request = HTTPRequest(base_url + "/intercepts/update/1/" + intercept.id,
            method="POST",
            body=json.dumps(body),
            headers=headers)
    response = yield http_client.fetch(request)

    assert response.code == 200
    response_data = json.loads(response.body)
    assert response_data["success"] == True
    assert len(app.intercepts.all()) == 1
    assert app.intercepts.all()[0]["query"] == "updated-query"


@pytest.mark.gen_test
def test_websocket(http_client, http_port):
    ws_url = "ws://localhost:" + str(http_port) + "/updates"
    ws_client = yield tornado.websocket.websocket_connect(ws_url)

    UpdatesHandler.broadcast({ "hello": "world" })

    response = yield ws_client.read_message()
    assert response == json.dumps({ "hello": "world" })
