const currentTab = cb => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    cb(tabs[0]);
  });
};

const isProd = process.env.NODE_ENV === "production";

export { currentTab, isProd };
