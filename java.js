var selectedOption = 28; //default value for action
let year;
let movieResults;
let Num = 0;

const options = {
	method: 'GET',
	headers: {
	  accept: 'application/json',
	  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjUxYjk2ODY5NDVkNGQzNzU4YmNmNWFlZWU4NmEyZCIsInN1YiI6IjY1YTVlODY4ZDM2M2U1MDEyYjBhZjVhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9UUxN0nb0dzc9MOEudTLjLlGNaHx13xMpRA3wHKmtFc'
	}
  };

document.getElementById("genreBox").addEventListener("change", function(){
	selectedOption = this.value;
})

function checkValidYear(){
	year = document.getElementById("yearInput").value;
	var isNumber = /^[0-9]+$/.test(year);
	if(!isNumber){
		document.getElementById("error").innerText = "Please enter a valid year.";
		return false;
	}
	else if(year.trim() === ""){
		document.getElementById("error").innerText = "Please enter a valid year.";
		return false;
	}
	else if(year < 1980 || year > 2024){
		document.getElementById("error").innerText = "Please enter a valid year.";
		return false;
	}
	else{
		document.getElementById("error").innerText = "";
		return true;
	}
}

function checkValidAmount(){
	let amount = document.getElementById("amountInput").value;
	var isNumber = /^[0-9]+$/.test(amount);
	if(!isNumber){
		document.getElementById("error").innerText = "Please enter a valid amount.";
		return false;
	}
	else if(amount < 5 || amount > 10){
		document.getElementById("error").innerText = "Please enter a valid amount.";
		return false;
	}
	else if(year.trim() === ""){
		document.getElementById("error").innerText = "Please enter a valid amount.";
		return false;
	}
	else{
		document.getElementById("error").innerText = "";
		return true;
	}

}

function getGenreName(genreId) {
	const genreMap = {
	28: 'Action',
	12: 'Adventure',
	16: 'Animation',
	35: 'Comedy',
	80: 'Crime',
	99: 'Documentary',
	18: 'Drama',
	10751: 'Family',
	14: 'Fantasy',
	36: 'History',
	27: 'Horror',
	10402: 'Music',
	9648: 'Mystery',
	10749: 'Romance',
	878: 'Science Fiction',
	10770: 'TV Movie',
	53: 'Thriller',
	10752: 'War',
	37: 'Western'
	};
  
	return genreMap[genreId] || 'Unknown';
}

function createMovies(){
	var newElement = document.createElement("div");
	newElement.className = "description";
	newElement.id = `desc${Num}`;

	var img = document.createElement("img");
	img.src = "Shrek+Poster.png";
	img.alt = "posterPicture";
	img.id = `poster${Num}`

	Num++;

	var innerDiv = document.createElement("div");
	var headings = ["Title:", "Genre:", "Rating:", "Year:"];
	headings.forEach(function (headingText) {
		var h3 = document.createElement("h3");
		h3.textContent = headingText;
		innerDiv.appendChild(h3);
	});

	newElement.appendChild(img);
	newElement.appendChild(innerDiv);

	var resultsBox = document.getElementById("resultsBox");
	resultsBox.appendChild(newElement);
}

async function generateMovies(){
	if(checkValidYear()){
		if(checkValidAmount()){
			console.log("Genre:" + selectedOption);
			console.log("Year:" + year);
	
			let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${selectedOption}&year=${year}`;
	
			try{
				let response = await fetch(url, options);
				let data = await response.json();
				movieResults = data;
				console.log(movieResults)
			  } catch (err) {
				console.error(err);
			  }
			
			let div = document.getElementById("buttonb");
			div.style.paddingBottom = "0px";
			
			let resultsBox = document.getElementById("resultsBox");
			resultsBox.innerHTML = "";
			Num = 0;
			let getAmount = document.getElementById("amountInput").value;
			for(let i = 0; i < getAmount; i++){
				createMovies();
			}
			for (let i = 0; i < getAmount; i++) {
				let movieTitle1 = movieResults.results[i].title;
				let genre1 = getGenreName(movieResults.results[i].genre_ids[0]);
				let rating1 = movieResults.results[i].vote_average;
				let releaseDate = movieResults.results[i].release_date;
				let posterurl = "https://image.tmdb.org/t/p/original" + movieResults.results[i].poster_path;
			
				let posterElement = document.getElementById(`poster${i}`);
				posterElement.src = posterurl;
			
				let titleElement = document.querySelector(`#desc${i} h3:nth-child(1)`);
				titleElement.innerText = "Title: " + movieTitle1;
			
				let genreElement = document.querySelector(`#desc${i} h3:nth-child(2)`);
				genreElement.innerText = "Genre: " + genre1;
			
				let ratingElement = document.querySelector(`#desc${i} h3:nth-child(3)`);
				ratingElement.innerText = "Rating: " + rating1;
			
				let yearElement = document.querySelector(`#desc${i} h3:nth-child(4)`);
				yearElement.innerText = "Release Date: " + releaseDate; 
			}
		}
	}
}
  