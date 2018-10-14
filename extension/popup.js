
function post(path, params, method) {
  method = method || "post";

  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in params) {
    if(params.hasOwnProperty(key)) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

function doStuffWithDom(domContent) {
  post('http://127.0.0.1:5000/genresume', {data: domContent});
  console.log(domContent);
}

document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('genresume-button');
  button.addEventListener('click', function (tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function (openTabs) {
      var tab = openTabs[0]; //this should work like 99.9% of the time, but not guaranteed
      chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
    });
  });
});