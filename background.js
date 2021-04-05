chrome.runtime.onMessage.addListener(function (message, _callback) {
  console.log('message', message)
  const { type, _text } = message
  if (type === "ENABLE_ICON") {
    chrome.action.setIcon({
      path: {
        "16": "images/cmb16.png",
        "128": "images/cmb128.png"
      }
    })
  } else {
    // TODO
  }
})