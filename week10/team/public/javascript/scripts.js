function getPerson() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            var txt = "<table class='table'>";
            txt += "<thead><tr><th scope='col'>Name</th><th scope='col'>Birthday</th></tr></thead><tbody>";
            for (x in myObj) {
                txt += "<tr><td>" + myObj[x].firstname + " " + myObj[x].lastname + "</td><td>" + myObj[x].birthday + "</td></tr>";
            }
            txt += "</tbody></table>";
            document.getElementById("results").innerHTML = txt;
        }
    };

    var id = document.getElementById("id").value;
	var urlParameters = "?id=" + id;

    xmlhttp.open("GET", "/getPerson" + urlParameters, true);
    xmlhttp.send();
}