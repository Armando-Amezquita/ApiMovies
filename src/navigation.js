arrowBtn.addEventListener('click', () => {
    //window.history.back(); sirve para que cuando se le click al boton vuelva a la pagina anterios y no al home
    location.hash = window.history.back();
    // location.hash = '#home';
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends=';
});

searchFormBtn.addEventListener('click', () =>{
    location.hash = `#search=${searchFormInput.value}`; 
});


//DOMContentLoaded
//Se encarga de ejecutar la funcion de navigator apenas carga la aplicacion.
window.addEventListener('DOMContentLoaded', navigator, false);
//hashchange
//Se encarga de visualizar cual es el hash de la ruta y renderizar o ejecutar la función de esa ruta especifica.
window.addEventListener('hashchange', navigator, false);

//location:
//Permite saber al navegador en que vista esta el usuario, tiene una propiedad llamada hash.
//hash:
//Hace refenrencia al #final de la URL ejemplo: https://platzi#cursos, cursos seria el hash

//Esta es la logica de navegacion, para que de acuerdo al hash que se utilice, ejecute diferente funcion y renderice la informacion de esa funcion.
function navigator(){
    console.log({ location });
    //Pregunta si el hash de la url empieza con trends para ejecutar la funcion trends
    if(location.hash.startsWith('#trends')){
        trendsPage();
    } else if(location.hash.startsWith('#search=')){
        searchPage();
    } else if(location.hash.startsWith('#movie=')){
        movieDetailsPage();
    } else if(location.hash.startsWith('#category=')){
        categoriesPage();
    } else{
        homePage();
    }

    window.scroll(0,0);

}

function homePage(){
    console.log('Home')

    //Estas categorias las trae del archivo nodes.js
    headerSection.classList.remove('header-container--long');
    headerSection.style.backgound = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');

    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getGenresMoviesPreview();
}

function categoriesPage(){
    
    console.log('Category ')
    headerSection.classList.remove('header-container--long');
    headerSection.style.backgound = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [urlHash, urlDescription]  = location.hash.split('=');
    
    const[ urlId, urlName ]= urlDescription.split('-');

    headerCategoryTitle.innerHTML = urlName;

    getMoviesByCategory(urlId);
}

function movieDetailsPage(){
    
    console.log('movie ')
    headerSection.classList.add('header-container--long');
    headerSection.style.backgound = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, idMovie ] = location.hash.split('=');
    getMovieDetails(idMovie);
}

function searchPage(){
    console.log('search');
    headerSection.classList.remove('header-container--long');
    headerSection.style.backgound = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    getSearchMovieValue(query);
    searchFormInput.value = '';

}

function trendsPage(){
    console.log('Trends');
    headerSection.classList.remove('header-container--long');
    // headerSection.style.backgound = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';
    getTrendingMovies()
}