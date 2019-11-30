function searchForMovie() {
    var search = $("#search");
    var resultContainer = $("#results");
    console.log("Received a request to search for: " + search.val());

    $.get("/apikey", function(key, status){
        if (key != ""){
            url = "http://www.omdbapi.com/?apikey=" + key +"&page=10&type=movie&s=" + search.val()

            console.log(apikey);

            $.get(url, function(data, status){
                resultContainer.html(function() {
                    var html = "<br>";
                    $.each(data.Search, function(key, value) {
                        var index = key + 1
                        html += "<p>" + index + ": " + value.Title + " - " + value.Year + "</p>";
                    });
                    return html;
                });
            });
        }
    });
}