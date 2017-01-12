 // modal code
 (function(){
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    var navbloc = document.getElementById("nav-bloc");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
      modal.style.display = "none";
      navbloc.removeAttribute('style');
    }

    function init() {
        loadJSON(function(data) {
            var clients = JSON.parse(data);
            var clientsArr = Object.keys(clients).map(function(k) { return clients[k] });
            for (var i in clientsArr[0]) {
                var imgArr = [];
                // only process if client matches # in url
                if (getParameterByName('client') === clientsArr[0][i].id) {

                    // take care of images
                    for (var j in clientsArr[0][i].images) {
                        var imgSrc = clientsArr[0][i].images[j];
                        imgArr.push(imgSrc);
                    }
                    loadImages(imgArr);

                    // load data
                    $('#clientName').html(clientsArr[0][i].name);
                    $('#clientText').html(clientsArr[0][i].description);
                    break;
                }
            }
        });
    }

    // inline script to load content from json file
    function loadJSON(callback) {   
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', '/assets/payloads/clients.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
             callback(xobj.responseText);
            }
        };
        xobj.send(null);  
     }

    // load images
    function loadImages(imgArr) {
        $('img[id^="myImg"]').each(function(index, item) {
            if (imgArr[index] != null) {
                $(this).attr('src', 'assets/img/clients/' + imgArr[index].src);
                $(this).attr('alt', imgArr[index].alt);
                $(this).on('click', function(evt) {
                    modal.style.display = "block";
                    modalImg.src = $(this).attr('src');
                    captionText.innerHTML = $(this).attr('alt');
                    navbloc.style.display = "none";
                });
            }
        });
    }

    function getParameterByName(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // initialize
    init();
})();