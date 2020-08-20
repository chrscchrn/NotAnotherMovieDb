$(document).ready(function () {

    const APIKey = "5a3f3373b8ebcad2db18450af15ec4fd";
    const genres = [
        { "Genre": "Action", "ID": "28" },
        { "Genre": "Crime", "ID": "80" },
        { "Genre": "Documentary", "ID": "99" },
        { "Genre": "Adventure", "ID": "12" },
        { "Genre": "Animation", "ID": "16" },
        { "Genre": "Comedy", "ID": "35" },
        { "Genre": "Drama", "ID": "18" },
        { "Genre": "Family", "ID": "10751" },
        { "Genre": "Fantasy", "ID": "14" },
        { "Genre": "History", "ID": "36" },
        { "Genre": "Horror", "ID": "27" },
        { "Genre": "Music", "ID": "10402" },
        { "Genre": "Mystery", "ID": "9648" },
        { "Genre": "Romance", "ID": "10749" },
        { "Genre": "Science Fiction", "ID": "878" },
        { "Genre": "TV Movie", "ID": "10770" },
        { "Genre": "Thriller", "ID": "53" },
        { "Genre": "War", "ID": "10752" },
        { "Genre": "Western", "ID": "37" }
    ]

    for (let i = 0; i < genres.length; i++) {
        newGenre = $("<option>");
        newGenre.text(genres[i].Genre);
        newGenre.data("number", genres[i].ID);
        newGenre.val(genres[i].ID);
        $("#genreDropDown").append(newGenre);
    }

    //select dropdown list
    $('select').formSelect();
    let genreID = "";
    var personID = "";
    let startYear = "";
    let endYear = "";
    let includeActor = "";
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var x
        if ($("#genreDropDown").val() !== null) {
            genreID = $("#genreDropDown").val();
        }
        if ($("#year1").val() !== "") {
            startYear = $("#year1").val();
        }
        else {
            startYear = 1990;
        }
        if ($("#year2").val() !== "") {
            endYear = $("#year2").val();
        }
        else {
            endYear = 2020;
        }
        console.log(startYear, endYear);
        includeActor = $("#includeActor").val();
        $("#submit").attr("disabled", true);

        var IDqueryURL = "https://api.themoviedb.org/3/search/person?api_key=" + APIKey + "&language=en-US&page=1&include_adult=false&query=" + includeActor;
        if (includeActor.trim() != "") {
            $.ajax({
                url: IDqueryURL,
                method: "GET"
            })

                .then(function (response) {
                    console.log(response); //good
                    var personID = response.results[0].id;
                    console.log(personID);
                    maincall(personID);
                });
        }

        else {
            maincall(personID);
        }

    })

    function maincall(personID) {
        var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + APIKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=" + startYear + "-01-01&primary_release_date.lte=" + endYear + "-12-31&vote_average.gte=6&with_people=" + personID + "&with_genres=" + genreID;

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(response);
                $("#moviePosterDiv").empty();
                for (i = 0; i < response.results.length - 1; i++) {
                    var poster = $("<img>");
                    poster.attr("class", "moviePosters");
                    poster.attr("data-id", response.results[i].id);
                    poster.attr("src", "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path);
                    poster.attr("data-id", response.results[i].id);
                    $("#moviePosterDiv").prepend(poster);
                }

                var myIndex = 0;
                var random;
                var posterFunction;
                var count = 0;
                function slideshow() {
                    var i;
                    var x = document.getElementsByClassName("moviePosters");
                    for (i = 0; i < x.length; i++) {
                        x[i].style.display = "none";
                    }
                    myIndex++;
                    count += 1;
                    (myIndex > x.length) ? myIndex = 1 : null;
                    x[myIndex - 1].style.display = ("block");
                    if (count < (Math.floor(Math.random() * 40) + 27)) {
                        posterFunction = setTimeout(slideshow, 150);
                    }
                    else {
                        clearTimeout(random);
                        $("#submit").attr("disabled", false);
                        passToUtelly();
                    }

                }
                slideshow();
                

                // funciton LightsOn() {
                //     $('#netflixIcon').css('background-color', '#ff8c00');
                //     $('#huluIcon').css('background-color', '#ff8c00');
                //     $('#primeIcon').css('background-color', '#ff8c00');
                //     $('#disneyIcon').css('background-color', '#ff8c00');
                // }




                //button highlighter
                //if statements for each
                // 

            });
    }
    function passToUtelly(){
        var x = $('.moviePosters').filter(function () { 
            return this.style.display == 'block';
        });
        const movieId = $(x).attr("data-id");
        console.log(movieId);
        var externalQuery="https://api.themoviedb.org/3/movie/"+movieId+"/external_ids?api_key=5a3f3373b8ebcad2db18450af15ec4fd";
            $.ajax({
            url: externalQuery,
            method: "GET"
            })
            .then(function(response) {
            console.log(externalQuery);
            console.log(response.imdb_id);
            imdbID=response.imdb_id;
            utellycall(imdbID);
    })}
    function utellycall(imdbID){
        var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?country=us&source_id="+imdbID+"&source=imdb",
        "method": "GET",
        "headers": {
        "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": "9b41398bccmsh054a4c1235dff30p1c1836jsn95542e375cf5"
        }
        }

$.ajax(settings).done(function (response) {
console.log(response);
var isnetflix=false;
var ishulu=false;
var isdisney=false;
var isprime=false;
for(i=0;i<response.collection.locations.length;i++){
if (response.collection.locations[i].name=="DisneyPlusIVAUS"){
    isdisney=true;
}
if (response.collection.locations[i].name=="NetflixIVAUS"){
    isnetflix=true;
}if (response.collection.locations[i].name=="AmazonPrimeVideoIVAUS"){
    isprime=true;
}if (response.collection.locations[i].name=="HuluIVAUS"){
    ishulu=true;
}
}
console.log("isnetflix:"+isnetflix);
console.log("ishulu:"+ishulu);
console.log("isdisney:"+isdisney);
console.log("isprime:"+isprime);
});
    }
    
})