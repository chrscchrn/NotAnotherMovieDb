$(document).ready(function () {
    $('select').formSelect();

    const genres = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"];

    for (let i = 0; i < genres.length; i++) {
        newGenre = $("<option>");
        newGenre.text(genres[i]);
        newGenre.data("name", genres[i]);
        $("#dropdown1").append(newGenre);
    }
    
    $('.dropdown-trigger').dropdown();

});