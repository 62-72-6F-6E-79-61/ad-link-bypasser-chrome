// load manifest.json
const manifest = chrome.runtime.getManifest();

// check url
function checkUrl(url) {
  // if the url is in host_permissions
  for (let i = 0; i < manifest.host_permissions.length; i++) {
    if (url.startsWith(manifest.host_permissions[i].replace("*", ""))) {
      return true;
    }
  }
  return false;
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (checkUrl(tab.url)) {
    // redirect

    chrome.storage.local.get("redirect", function (result) {
      chrome.tabs.update(tabId, {
        url: `https://bypass.city/bypass?bypass=${tab.url}${
          result["redirect"] ? "&redirect=true" : ""
        }`,
      });
    });
  }
});
