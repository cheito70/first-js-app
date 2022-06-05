/*Initial task of setting up the pokemonList objects. Used
reference from pokemon.com pokedex for data.*/
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

/*for (let i = 0; i < pokemonList.length; i++){
  if(pokemonList[i].height >6) {
        document.write(pokemonList[i].name + " " + " height: " + pokemonList[i].height + ' - Wow, that is Huge!' + "<br>");
} else {
  document.write(pokemonList[i].name + " " + " height: " + pokemonList[i].height + "<br>");
 }
} */

pokemonList.forEach(function(pokemon){
  if(pokemon.height > 6){
    document.write(pokemon.name + ' -Wow, that is huge!' + '<br>');}
  else{
  document.write(pokemon.name + " " + pokemon.height + " " + '<br>' );
}});
