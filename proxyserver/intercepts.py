import uuid

class Intercept(object):
    def __init__(self, query, id=None):
        self.query = query
        if id is not None:
            self.id = id
        else:
            self.id = str(uuid.uuid4())

    def to_json(self):
        return {
            "id": self.id,
            "query": self.query
        }

class Intercepts(object):
    def __init__(self):
        self.intercepts = []

    def add(self, intercept):
        if self.find_by_id(intercept.id) is None:
            self.intercepts.append(intercept)
            return True
        else:
            return False

    def delete(self, intercept_id):
        if self.find_by_id(intercept_id) is not None:
            self.intercepts = list(filter(lambda intercept: intercept.id != intercept.id, self.intercepts))
            return True
        else:
            return False

    def update(self, intercept):
        if self.find_by_id(intercept.id) is not None:
            self.delete(intercept.id)
            self.add(intercept)
            return True
        else:
            return False

    def all(self):
        return list(map(lambda intercept: intercept.to_json(), self.intercepts))

    def find_by_id(self, intercept_id):
        return next(filter(lambda intercept: intercept.id == intercept_id, self.intercepts), None)
