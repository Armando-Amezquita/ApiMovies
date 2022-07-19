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

// Utils
function renderInformationMovies(data, container){
  console.log(data)
    //Con esta linea se limpia el codigo que ya tenia cuando se haga la navegacion
  container.innerHTML = '';

  data.results.forEach(movie => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
      movieContainer.addEventListener('click', () => {
        location.hash = `#movie=${movie.id}`;
      })
      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
      movieContainer.appendChild(movieImg);
      container.appendChild(movieContainer);
    });
}

function renderInformationGenres(data, container){
    //Con esta linea se limpia el codigo que ya tenia cuando se haga la navegacion
  container.innerHTML = '';

  console.log(data)
  data.genres.forEach(genre => {
    const genreContainer = document.createElement('div');
    genreContainer.classList.add('category-container');

    const genreTitle = document.createElement('h3');
    const genreText = document.createTextNode(genre.name);
    genreTitle.appendChild(genreText);
    genreTitle.classList.add('category-title');
    genreTitle.setAttribute('id', `id${genre.id}`);
    //A cada genero de la api le estamos generando un evento el cual me redirecciona a search con el id y nombre de el genero.
    genreTitle.addEventListener('click', () => {
      location.hash = `#category=${genre.id}-${genre.name}`;
    })    

    genreContainer.appendChild(genreTitle);
    categoriesPreviewList.appendChild(genreContainer);
});
}

// Llamados a la API

async function getTrendingMoviesPreview(){
    const data = await axiosAPI(`/trending/movie/day`);
    const dataApi = data.data;
    renderInformationMovies(dataApi, trendingMoviesPreviewList);
}

async function getMoviesByCategory(id){
  const data = await axiosAPI(`/discover/movie`, {
    params: {
      //with_genres es porque es un parametro de la API para traer las peliculas por el id del genero. 
      with_genres: id
    }
  });
  const dataApi = data.data;
  renderInformationMovies(dataApi, genericSection);
}

async function getGenresMoviesPreview(){
    const data = await axiosAPI(`/genre/movie/list`);
    const genreApi = data.data;
    renderInformationGenres(genreApi, categoriesPreviewList)
}

async function getSearchMovieValue(query){
  try {
    const data = await axiosAPI(`/search/movie`, {
      params: {
        query
      }
    });
    const dataApi = data.data;
    renderInformationMovies(dataApi, genericSection);
    
  } catch (error) {
    console.log(error);
  }
} 

async function getTrendingMovies(){
  const data = await axiosAPI(`/trending/movie/day`);
  const dataApi = data.data;
  console.log(dataApi)
  renderInformationMovies(dataApi, genericSection);
}

async function getMovieDetails(idMovie){
  console.log(idMovie)
  const data = await axiosAPI(`/movie/${idMovie}`);
  const dataApi = data.data;
  console.log(dataApi)
  // renderInformationMovies(dataApi, genericSection);
  renderDetailsMovie(dataApi);
}

async function renderDetailsMovie(data){

  const movieImgUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`
  headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0,0,0,0.35) 19.27%,
      rgba(0,0,0,0) 29.17%
    ),
    url(${movieImgUrl})`;
  movieDetailTitle.innerHTML = data.title;
  movieDetailDescription.innerHTML = data.overview;
  movieDetailScore.innerHTML = data.vote_average;
  renderGe(data);
  
  await getMoviesRelated(data.id);
}

async function getMoviesRelated(id){
  const data = await axiosAPI(`/movie/${id}/recommendations`);
  let movies = data.data;

  renderInformationMovies(movies, relatedMoviesContainer );
}

async function renderGe(data){

  const genreContainer = document.querySelector('.categories-list');
  
  data.genres.forEach(genre => {
    const genreConteinerDiv = document.createElement('div');
    genreConteinerDiv.classList.add('category-container');

    const genreTitle = document.createElement('h3');
    const genreText = document.createTextNode(genre.name);
    genreTitle.appendChild(genreText);
    genreTitle.classList.add('category-title');
    genreTitle.setAttribute('id', `id${genre.id}`);
    
    genreConteinerDiv.appendChild(genreTitle)
    genreContainer.appendChild(genreConteinerDiv);
  });
}

