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
    let startYear, endYear, includeActor, excludeActor, director;

    for (let i = 0; i < genres.length; i++) {
        newGenre = $("<option>");
        newGenre.text(genres[i].Genre);
        newGenre.data("number", genres[i].ID);
        newGenre.val(genres[i].ID);
        $("#genreDropDown").append(newGenre);
    }


    $('select').formSelect();

    let startYear, endYear, includeActor, excludeActor, director;
    $("#submit").on("click", function (event) {
        event.preventDefault();
        genreID = $("#genreDropDown").val();
        console.log(genreID);
        startYear = $("#year1").val().trim();
        endYear = $("#year2").val().trim();
        console.log(startYear, endYear);
        includeActor = $("#includeActor").val().toLowerCase().trim();
        excludeActor = $("#excludeActor").val().toLowerCase().trim();
        console.log(includeActor, excludeActor);
        director = $("#includeDirector").val().toLowerCase().trim();
        console.log(director);
        var IDqueryURL="https://api.themoviedb.org/3/search/person?api_key="+APIKey+"&language=en-US&page=1&include_adult=false&query="+includeActor;
        
        if(includeActor.trim()!=""){
            $.ajax({
        url: IDqueryURL,
        method: "GET"
        })
        .then(function(response) {
            // console.log(queryURL);
            console.log(response);
            personID=(response.results[0].id);
            console.log(personID);
            // console.log(queryURL);
            maincall(personID);
        });
        }
        else{
            maincall(personID);
        }
    })
    function maincall(personID){
        var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key="+APIKey+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte="+startYear+"-01-01&primary_release_date.lte="+endYear+"-12-31&vote_average.gte=6&with_people="+personID+"&with_genres="+genreID;        

        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            console.log(queryURL);
            console.log(response);
            console.log(response.results[0].poster_path);
            var resInd=Math.floor(Math.random() * 20);
            var poster=$("<img>");
            poster.attr("src","https://image.tmdb.org/t/p/w500"+response.results[resInd].poster_path);
            $("#posterslot").append(poster);
            var movietitle=$("<h4>");
            movietitle.text(response.results[resInd].title+"("+response.results[resInd].release_date.substring(0,4)+")");
            $("#titlecard").append(movietitle);

            // //movie poster generator
            // //generate image
            // //add class 
            // //add src
            // //repeat until done
            // var myIndex = 0;
            // slideshow();

            // function slideshow() {
            //     var i;
            //     var x = $(".movieCovers");
            //     for (i = 0; i < x.length; i++) {
            //         x[i].style.display = "none";  
            //     }
            //     myIndex++;
            //     if (myIndex > x.length) {myIndex = 1}    
            //     x[myIndex-1].style.display = "block";  
            //     setTimeout(slideshow, 150); // Change image every .15 seconds returns the id of the global var timeout
            // }
            // //button highlighter
            //     //if statements for each
            // $('#netflixIcon').css('background-color', '#ff8c00');
            // $('#huluIcon').css('background-color', '#ff8c00');
            // $('#primeIcon').css('background-color', '#ff8c00');
            // $('#disneyIcon').css('background-color', '#ff8c00');
        });
        }

   
})

