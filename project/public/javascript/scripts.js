function getHomework() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            var txt = "<table class='table table-striped'><thead><tr><th scope='col'>Homework Title</th><th scope='col'>Homework Type</th></tr></thead><tbody>";

            for (x in myObj) {
                txt += "<tr><td>" + myObj[x].hwname + "</td><td>" + myObj[x].hwtype_id + "</td></tr>";
            }

            txt += "</tbody></table>";

            document.getElementById("hwDisplay").innerHTML = txt;
        }
    };
    
    xhttp.open("GET", "/getHomework", true);
    console.log("Sending AJAX request...");
    xhttp.send();
}