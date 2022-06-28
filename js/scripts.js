//Emptied out array and created apiUrl variable to establish url from pokedex

let pokemonRepository = (function () {
 let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1154';


function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&

    ) {
     pokemonList.push(pokemon);
   } else {
     console.log("pokemon is not correct");
   }
 }
  function getAll() {
    return pokemonList;
  }

  //This function creates button and list elements by using the .pokemon-list button class.
  function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener("click", function(event){
      showDetails(pokemon);
  });
  }

//This function calls the showDetails function when button is clicked
function eventListener(button, pokemon) {
  button.addEventListener("click", function(){
      showDetails(pokemon);
  });
}

function showDetails(pokemon) {
  console.log(pokemon);
}


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem

  };

})();

pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
 /*function add(pokemon) {
   repository.push(pokemon);
 }
  function getAll() {
    return repository;
  }
  return {
    add: add,
    getAll: getAll
  };

})();

//Create and display the pokemonList via the getAll keys with forEach loop
//outside of IIFE

pokemonRepository.getAll().forEach(function(pokemon){
  if(pokemon.height > 6){
    document.write(pokemon.name + ' -Wow, that is huge!' + '<br>');} else{
  document.write(pokemon.name + " " + pokemon.height + " " + '<br>' )}
});*/
