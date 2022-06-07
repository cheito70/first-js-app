/*Initial task of setting up the pokemonList objects. Used
reference from pokemon.com pokedex for data.*/
let pokemonRepository = (function () {
 let pokemonList = [
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
   pokemonList.push(pokemon);
 }
  function getAll() {
    return pokemonList;
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
});
