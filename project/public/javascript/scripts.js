function getHomework() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            var txt = "<table class='table'>";
            txt += "<thead><tr><th scope='col'>Homework Name</th><th scope='col'>Homework Type</th><th scope='col'>Due Date</th></tr></thead><tbody>";
            for (x in myObj) {
                txt += "<tr><td>" + myObj[x].hwname + "</td><td>" + myObj[x].hwtype + "</td><td>" + myObj[x].duedate + "</td></tr>";
            }
            txt += "</tbody></table>";
            document.getElementById("hwDisplay").innerHTML = txt;
        }
    };

    /* var id = document.getElementById("id").value;
	var urlParameters = "?id=" + id; */

    xmlhttp.open("GET", "/getHomework", true);
    xmlhttp.send();
}