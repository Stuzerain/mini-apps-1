console.log('js loaded');

var sender = document.getElementById('sender');
var downloader = document.getElementById('downloader');

var sendIt = (url) => {
  var formFile = new FormData($("form").get(0));
  $.ajax({
    url: url,
    data: formFile,
    dataType: 'json',
    type: 'POST',
    processData: false,
    contentType: false,
    success: function (res) {
      console.log(res);
    },
    error: (res) => {
      console.log('There was a problem with the submission ', res.responseText);
      $('#response').append(res.responseText);
    }
  });
  event.preventDefault();
}

var downloadIt = () => {
  debugger;
  $.ajax({
    url: 'http://localhost:3000/download',
    type: 'GET',
    // success: (res) => {
    //   console.log(res);
    // }
  })
    .done(res => res.blob())
    .done(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // the filename you want
      a.download = 'todo-1.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      alert
    })
}

sender.onclick = () => { sendIt('http://localhost:3000') };
// downloader.onclick = () => { downloadIt() };