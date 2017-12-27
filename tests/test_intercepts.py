from proxyserver.intercepts import Intercept, Intercepts


def test_intercept_generates_unique_ids():
    first_intercept = Intercept("my-first-query")
    second_intercept = Intercept("my-second-query")
    assert first_intercept.id != second_intercept.id


def test_intercept_stores_query():
    intercept = Intercept("my-query")
    assert intercept.query == "my-query"


def test_intercept_stores_query_kwarg():
    intercept = Intercept(query="my-query")
    assert intercept.query == "my-query"


def test_intercept_can_be_created_with_and_id():
    intercept = Intercept("my-query", id="my-id")
    assert intercept.id == "my-id"


def test_intercepts_to_json():
    intercept = Intercept("my-query")
    expected_json = {
        "id": intercept.id,
        "query": intercept.query
    }
    assert intercept.to_json() == expected_json


def test_intercepts_all_returns_empty_list():
    intercepts = Intercepts()
    intercept_list = intercepts.all()
    assert intercept_list == []


def test_adding_an_intercept():
    intercepts = Intercepts()
    intercept = Intercept("my-query")
    result = intercepts.add(intercept)
    intercept_list = intercepts.all()
    assert result is True
    assert intercept_list == [intercept.to_json()]


def test_finding_an_intercept():
    intercepts = Intercepts()
    intercept = Intercept("my-query")
    result = intercepts.add(intercept)
    assert intercepts.find_by_id(intercept.id) == intercept


def test_finding_a_non_existing_intercept():
    intercepts = Intercepts()
    assert intercepts.find_by_id("non-existing-id") is None


def test_adding_an_intercept_with_an_existing_id():
    intercepts = Intercepts()
    intercept = Intercept("my-query")
    result = intercepts.add(intercept)

    new_intercept = Intercept("some-other-query", id=intercept.id)
    result = intercepts.add(new_intercept)
    assert result is False

    intercept_list = intercepts.all()
    assert intercept_list == [intercept.to_json()]


def test_updating_an_intercept():
    intercepts = Intercepts()
    intercept = Intercept("my-query")
    intercepts.add(intercept)

    updated = Intercept("update-query", id=intercept.id)
    result = intercepts.update(updated)

    intercept_list = intercepts.all()
    assert result is True
    assert intercept_list == [updated.to_json()]


def test_updating_a_non_existing_intercept():
    intercepts = Intercepts()
    intercept = Intercept("my-query")
    intercepts.add(intercept)

    updated = Intercept("update-query", id="some-other-id")
    result = intercepts.update(updated)

    intercept_list = intercepts.all()
    assert result is False
    assert intercept_list == [intercept.to_json()]


def test_deleting_an_intercept():
    intercepts = Intercepts()
    intercept = Intercept("my-query")
    intercepts.add(intercept)
    result = intercepts.delete(intercept.id)
    intercept_list = intercepts.all()
    assert result is True
    assert intercept_list == []


def test_deleting_non_existing_intercept():
    intercepts = Intercepts()
    result = intercepts.delete("non-existing-id")
    intercept_list = intercepts.all()
    assert result is False
    assert intercept_list == []
