//Emptied out array and created apiUrl variable to establish url from pokedex

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1154';

//Retrieve all pokemonList
function getAll() {
    return pokemonList;
  }

  function add(item) {
      pokemonList.push(item);
  }

  //This function creates button and list elements by using the .pokemon-list button class.
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    //Append elements
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    //On click, showDetails
    button.addEventListener("click", function(event){
      showDetails(pokemon);
    });
  }


//This function (loadList) fetches the data in json form from the api
//and parses it. It contains the response param, the forEach loop function
//as well as the .then and .catch callback functions.
function loadList() {
  return fetch(apiUrl).then(function(response) {
    return response.json();
  }).then(function(json) {
    json.results.forEach(function(item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
      console.log(pokemon);
    });
  }).catch (function(e) {
    console.error(e);
  });
}

//loadDetails function adds item info and image
function loadDetails(item){

  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function(details){
    //Now add details to item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;

  }).catch(function(e){
    console.error(e);
  })
}

//Function logs the loadDetails result in the console
function showDetails(pokemon) {
  loadDetails(pokemon).then(function() {
    //Show modal
    showModal(pokemon);
  });
}

//modal


return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails

};

})();


pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
