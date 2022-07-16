//Emptied out array and created apiUrl variable to establish url from pokedex

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1154';

//Search code
  let search = document.getElementById("poke-search");
  search.addEventListener("input", searchList);

  function searchList() {
    let searchInput = document.getElementById("poke-search").value;
    searchInput = searchInput.toLowerCase();
    let listItem = $("li");
    listItem.each(function () {
      let item = $(this);
      let name = item.text();
      if (name.includes(searchInput)) {
        item.show();
      } else {
        item.hide();
      }
    });
  }

  //Retrieve all pokemonList
  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //This function creates button and list elements by using the .list-group button class.
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-custom");

    listItem.classList.add("list-group-item");
    button.setAttribute("data-target", "#poke-modal");
    button.setAttribute("data-toggle", "modal");

    //Append elements
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    //On click, showDetails
    clickEvent(button, pokemon);

  }

function clickEvent(button, pokemon) {
  button.addEventListener("click", function() {
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
      item.imageUrl = details.sprites.other["official-artwork"].front_default;
      item.id = details.id;
      item.feet = details.height;
      item.weight = details.weight;

      let types = [];
      details.types.forEach((item) => types.push(item.type.name));
      item.types = types;
      /*item.height = details.height;
      item.types = details.types;*/

    }).catch(function(e){
      console.error(e);
    });
  }

  //Function logs the loadDetails result in the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      //Show modal
      showModal(pokemon);
    });
  }

  //The modal code will be here.



  function showModal(pokemon) {

    let modalBody = document.querySelector("#poke-modal-body");
    let modalTitle = document.querySelector("#poke-modal-title");

    modalTitle.innerHTML = "";
    modalBody.innerHTML = "";

    let pokemonName = document.createElement("h1");
    pokemonName.innerText = pokemon.name;

    let pokemonId = document.createElement("h2");
    pokemonId.innerText = "#" + pokemon.id.toString().padStart(3, 0);

    let pokemonSprite = document.createElement("img");
    pokemonSprite.src = pokemon.imageUrl;
    pokemonSprite.classList.add("pokemon-sprite");

    let pokemonType = document.createElement("p");
    pokemonType.innerText = "Type: " + pokemon.types.join(", ");
    pokemonType.classList.add("pokemon-type");

    let pokemonHeight = document.createElement("p");
    pokemonHeight.innerText = "Height: " + pokemon.feet + "' ";

    let pokemonWeight = document.createElement("p");
    pokemonWeight.innerText = "Weight: " + pokemon.weight.toFixed(1) + " lbs";

    modalTitle.appendChild(pokemonName);
    modalTitle.appendChild(pokemonId);
    modalBody.appendChild(pokemonSprite);
    modalBody.appendChild(pokemonType);
    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonWeight);

  }

/*  function hideModal(){
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    //Since this is also triggered when inside the modal
    //We want it to close if user clicks on overlay
    let target = e.target;
    if (target === modalContainer){
      hideModal();
    }
  });

  //Swipe functions

  let touchstartX = 0;
  let touchendX = 0;

  function swipe(pokemon) {
    //Swipe left
    if ((touchendX < (touchstartX+50)) && (pokemonList.indexOf(pokemon) < (pokemonList.length-1))) {
      hideModal();
      showDetails(pokemonList[pokemonList.indexOf(pokemon)-1]);
      touchstartX = 0;
      touchendX = 0;
    }*/




  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails

  };

})();

//Print all objects in pokemon list
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
