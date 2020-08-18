var APIKey = "5a3f3373b8ebcad2db18450af15ec4fd";

var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=5a3f3373b8ebcad2db18450af15ec4fd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=28"
$.ajax({
url: queryURL,
method: "GET"
})
.then(function(response) {
    
    console.log(queryURL);
    console.log(response);

});