const API = "https://api.themoviedb.org/3";

//NOTA:
//  Cada vez que se ejecuta la navegacion es decir que se da click en algun boton y ello lleva a otra pagina y luego volvemos a la misma, se va a duplicar todo lo que se llame de la API, es decir que se debe limpiar ese nodo para que la informacion no se duplique

//Fetch:
    // const data = await fetch(`${API}/trending/movie/day?api_key=${API_KEY}`);
    // const dataJson = await data.json();

//Con AXIOS se pueden pasar los parametros que necesita la API para realizar la consulta, como el api_key.

const axiosAPI = axios.create({
  baseURL: API,
  Headers: {
    'Content-Type': 'application/json;charset=utl-8'
  },
  params: {
    api_key: API_KEY
  }
})


async function getTrendingMoviesPreview(){
    const data = await axiosAPI(`/trending/movie/day`);
    // const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList');
    // Este elemento se esta obteniendo desde el archivo nodes.js

    trendingMoviesPreviewList.innerHTML = '';

    data.data.results.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
    
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
    
        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer);
        
    });
}

async function getGenresMoviesPreview(){

    const data = await axiosAPI(`/genre/movie/list`);
    // const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list');

    //Con esta linea se limpia el codigo que ya tenia cuando se haga la navegacion
    categoriesPreviewList.innerHTML = '';

    data.data.genres.forEach(genre => {
        const genreContainer = document.createElement('div');
        genreContainer.classList.add('category-container');

        const genreTitle = document.createElement('h3');
        const genreText = document.createTextNode(genre.name);
        genreTitle.appendChild(genreText);
        genreTitle.classList.add('category-title');
        genreTitle.setAttribute('id', `id${genre.id}`);    
    
        genreContainer.appendChild(genreTitle);
        categoriesPreviewList.appendChild(genreContainer);
    });
}

