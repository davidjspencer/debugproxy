export function receiveIntercept(intercepts) {
  return {
    type: "INTERCEPT_RECEIVE",
    intercepts: intercepts
  }
}

export function receiveInterceptError(intercepts) {
  return {
    type: "INTERCEPT_RECEIVE_ERROR"
  }
}

export function selectIntercept(intercept) {
  return {
    type: "INTERCEPT_SELECT",
    selected: intercept
  }
}

export function createIntercept() {
  return {
    type: "INTERCEPT_CREATE"
  }
}

export function interceptSaveComplete(intercept) {
  return {
    type: "INTERCEPTS_SAVE_COMPLETE",
    intercept: intercept
  }
}

export function interceptSaveError() {
  return {
    type: "INTERCEPTS_SAVE_ERROR"
  }
}

export function interceptSaveStart() {
  return {
    type: "INTERCEPTS_SAVE_START"
  }
}

export function changeIntercept(value) {
  return {
    type: "INTERCEPT_CHANGE",
    value: value
  }
}

export function cancelIntercept() {
  return {
    type: "INTERCEPT_SELECT",
    selected: null
  }
}

export function loadIntercepts() {
  return (dispatch, getState) => {
    return window.fetch("/intercepts/all/" + session_id, {
      credentials: "same-origin"
    }).then(function(response) {
      if (response.status == 200) {
        response.json().then(function(data) {
          dispatch(receiveIntercept(data.intercepts))
        }).catch(function() {
          dispatch(receiveInterceptError())
        });
      } else {
        dispatch(receiveInterceptError())
      }
    }).catch(function(error) {
      dispatch(receiveInterceptError())
    });
  }
}


export function saveIntercept() {
  return (dispatch, getState) => {
    var state = getState();

    var interceptId = state.intercepts.selected_id;
    var intercept = state.intercepts.selected;
    var sessionId = state.socket.session_id;
    var csrf_token = state.socket.csrf_token;

    // ignore invalid updates
    if (intercept.query == "") {
      return;
    }

    dispatch(interceptSaveStart());

    if (intercept.id) {
      window.fetch("/intercepts/update/" + sessionId + "/" + intercept.id, {
        credentials: "same-origin",
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf_token
        },
        body: JSON.stringify(intercept),
      }).then(function(response) {
        response.json().then(function(text) {
          dispatch(interceptSaveComplete(intercept));
        }).catch(function() {
          dispatch(interceptSaveError());
        });
      }).catch(function() {
        dispatch(interceptSaveError());
      });
    } else {
      window.fetch("/intercepts/create/" + sessionId, {
        credentials: "same-origin",
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf_token
        },
        body: JSON.stringify(intercept),
      }).then(function(response) {
        response.json().then(function(data) {
          dispatch(interceptSaveComplete(data.intercept));
        }).catch(function() {
          dispatch(interceptSaveError());
        });
      }).catch(function() {
        dispatch(interceptSaveError());
      });
    }
  };
}

export function deleteIntercept() {

  return (dispatch, getState) => {
    var state = getState();

    dispatch(interceptSaveStart());

    var interceptId = state.intercepts.selected_id;
    var intercept = state.intercepts.selected;
    var sessionId = state.socket.session_id;
    var csrf_token = state.socket.csrf_token;

    window.fetch("/intercepts/delete/" + sessionId + "/" + intercept.id, {
      credentials: "same-origin",
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf_token
      }
    }).then(function(response) {
      response.json().then(function(text) {
        dispatch({
          type: "INTERCEPTS_DELETE_COMPLETE",
          intercept: intercept
        });
      }).catch(function() {
        dispatch(interceptSaveError());
      });
    }).catch(function() {
      dispatch(interceptSaveError());
    });
  }
}

export function deleteInterceptInline(interceptDeleted, interceptDeletedId) {

  return (dispatch, getState) => {
    var state = getState();

    dispatch(interceptSaveStart());

    var interceptId = state.intercepts.interceptDeletedId;
    var intercept = interceptDeleted;
    var sessionId = state.socket.session_id;
    var csrf_token = state.socket.csrf_token;

    window.fetch("/intercepts/delete/" + sessionId + "/" + interceptDeletedId, {
      credentials: "same-origin",
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf_token
      }
    }).then(function(response) {
      response.json().then(function(text) {
        dispatch({
          type: "INTERCEPTS_DELETE_COMPLETE",
          intercept: intercept
        });
      }).catch(function() {
        dispatch(interceptSaveError());
      });
    }).catch(function() {
      dispatch(interceptSaveError());
    });
  }
}

