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


    $('select').formSelect();

    $("#submit").on("click", function (event) {
        event.preventDefault();
        genreID = $("#genreDropDown").val();
        console.log(genreID);
        
        var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key="+APIKey+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&page=2&with_genres="+genreID;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
    
                console.log(queryURL);
                console.log(response);
    
            });
        let startYear = $("#year1").val().trim();
        let endYear = $("#year2").val().trim();
        console.log(startYear, endYear);
        let includeActor = $("#includeActor").val().trim();
        let excludeActor = $("#excludeActor").val().trim();
        console.log(includeActor, excludeActor);
        let director = $("#includeDirector").val().trim();
        console.log(director);
    })


    // var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=5a3f3373b8ebcad2db18450af15ec4fd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=28"
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // })
    //     .then(function (response) {

    //         console.log(queryURL);
    //         console.log(response);

    //     });
})

