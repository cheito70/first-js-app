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

//The modal code will be here.

function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      //show Modal
      showModal(pokemon);
    });
  }

//Modal

let modalContainer = document.querySelector('#modal-container');

  function showModal(pokemon) {

    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute("pointer-action", "none");

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.addEventListener('click', hideModal);

    //pokemon name as title
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    //Content element including details
    let contentElement = document.createElement('p');
    //height
    contentElement.innerHTML = "Height: " +pokemon.height+ " inches"+ "<br>" ;
    //..and types
    let types = [];
    pokemon.types.forEach(function(typeObj){
      types.push("" + typeObj.type.name);
    });
    //One or multiple types
    if (types.length < 2) {
      contentElement.innerHTML += "Attribute Type: ";
    } else {
      contentElement.innerHTML += "Attribute Types: ";
    }
    contentElement.innerHTML += types.toString();

    //Pokemon image
    let imageElement = document.createElement('img');
    imageElement.classList.add('pokemon-image');
    imageElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(imageElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    //Swipe func + event Listener + call func
    modal.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX;
    })
    modal.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX;
      swipe(pokemon);
    })

  }

  function hideModal(){
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
      }
    }



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
