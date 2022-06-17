/*Initial task of setting up the pokemonList objects. Used
reference from pokemon.com pokedex for data.*/
let pokemonRepository = (function () {
 let repository = [
    {name: "Charizard", height: 5.7, type: ["Fire", "Flying"]},
    {name: "Wartortle", height: 3.3, type: ["Water"]},
    {name: "Zubat", height: 2.7, type: ["Poison", "Flying"]},
    {name: "Machop", height: 2.7, type: "Fighting"},
    {name: "Venusau", height: 6.7, type: ["Grass", "Poison"]},
    {name: "Charmeleon", height: 3.7, type: "Fire"},
    {name: "Drowzee", height: 3.3, type: "Psychic"},
    {name: "Gengar", height: 4.11, type: ["Ghost", "Poison"]},
    {name: "Gyarados", height: 21.4, type: ["Water", "Flying"]},
    {name: "Dragonite", height: 7.3, type: ["Dragon", "Flying"]}
];

function add(pokemon) {

     repository.push(pokemon);

 }
  function getAll() {
    return repository;
  }
  function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
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
