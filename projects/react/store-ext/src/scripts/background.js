let state = {};

// Add listener for runtime connections
chrome.runtime.onConnect.addListener(port => {
  // If the connection is the one we care about add listener to it
  if (port.name === "background-content") {
    port.onMessage.addListener(msg => {
      state = msg.payload;
    });
  }
});

chrome.runtime.onMessage.addListener(
  (msg, sender, res) => msg.type === "REQ_STATE" && res(state)
);
