function supports_history_api() {
  return !!(window.history && history.pushState);
}

function swapPhoto(href) {
  var req = new XMLHttpRequest();
  req.open("GET",
           "http://127.0.0.1:8020/Projet-JS-HTML5/client/server/" +
             href.split("/").pop(),
           false);
  req.send(null);
  if (req.status == 200) {
    document.getElementById("article").innerHTML = req.responseText;
    setupHistoryClicks();
    return true;
  }
  return false;
}

function addClicker(link) {
  link.addEventListener("click", function(e) {
    if (swapPhoto(link.href)) {
      history.pushState(null, null, link.href);
      e.preventDefault();
    }
  }, true);
}

function setupHistoryClicks() {
  addClicker(document.getElementById("articlePre"));
  addClicker(document.getElementById("articlePre2"));
  addClicker(document.getElementById("articleNext"));
  addClicker(document.getElementById("articleNext2"));
}

window.onload = function() {
  if (!supports_history_api()) { return; }
  window.setTimeout(function() {
    window.addEventListener("popstate", function(e) {
      swapPhoto(location.pathname);
    }, false);
  }, 1);
}
