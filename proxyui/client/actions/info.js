function message(message, show) {
  return {
    "type": message,
    "show": show
  }
}

export function showInfo(message_1, message_2, show) {
	return (dispatch, getState) => {
    dispatch(message(message_1, show))
    if (show == true) {
      setTimeout(function() {
        var state = getState()
        if (state.info.mouse_over_address_button) {
          dispatch(message(message_2, show))
        }
      }, 2000)
    } else {
      dispatch(message(message_2, show))
    }
  }
}

export function showInterceptInfo(show: boolean) {
  return showInfo("INTERCEPT_INFO_MOUSE", "INTERCEPT_INFO_SHOW", show)
}

export function showAddressInfo(show: boolean) {
  return showInfo("ADDRESS_INFO_MOUSE", "ADDRESS_INFO_SHOW", show)
}

export function showConnectionInfo(show: boolean) {
  return showInfo("CONNECTION_INFO_MOUSE", "CONNECTION_INFO_SHOW", show)
}

export function showProgressOneInfo(show: boolean) {
  return showInfo("PROGRESS_INFO_1_MOUSE", "PROGRESS_INFO_1_SHOW", show)
}

export function showProgressTwoInfo(show: boolean) {
  return showInfo("PROGRESS_INFO_2_MOUSE", "PROGRESS_INFO_2_SHOW", show)
}

export function showProgressThreeInfo(show: boolean) {
  return showInfo("PROGRESS_INFO_3_MOUSE", "PROGRESS_INFO_3_SHOW", show)
}

export function showProgressFourInfo(show: boolean) {
  return showInfo("PROGRESS_INFO_4_MOUSE", "PROGRESS_INFO_4_SHOW", show)
}

export function showClearInfo(show: boolean) {
  return showInfo("CLEAR_INFO_MOUSE", "CLEAR_INFO_SHOW", show)
}

export function showResumeRequestInfo(show: boolean) {
  return showInfo("RESUME_REQUEST_INFO_MOUSE", "RESUME_REQUEST_INFO_SHOW", show)
}

export function showResumeResponseInfo(show: boolean) {
  return showInfo("RESUME_RESPONSE_INFO_MOUSE", "RESUME_RESPONSE_INFO_SHOW", show)
}

export function showHotkeysInfo(show: boolean) {
	return (dispatch, getState) => {
    dispatch({
      type: "HOTKEYS",
      show: show
    })
	}
}

