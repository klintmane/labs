// Connect to backgroundScript
const backgroundPort = chrome.runtime.connect({
  name: "background-content"
});

// Pass NEW_STATE events to backgroundScript via backgroundPort
window.addEventListener(
  "message",
  e => {
    if (e.data.action === "NEW_STATE") {
      backgroundPort.postMessage({
        type: "NEW_STATE",
        payload: e.data.payload
      });
    }
  },
  false
);
