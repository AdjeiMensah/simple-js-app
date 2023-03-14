// Create a self-executing anonymous function that returns an object with methods for managing Pokemon data
const pokemonRepository = (() => {
  // Declare an array of Pokemon objects
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  // Method for adding a new Pokemon to the array
  const add = (pokemon) => {
    pokemonList.push(pokemon);
  };

  // Method for getting all Pokemon in the array
  const getAll = () => {
    return pokemonList;
  };

  // Method for adding a new Pokemon to the list on the page
  const addListItem = (pokemon) => {
    // Get the <ul> element that will contain the list of Pokemon
    const pokemonListElement = document.querySelector('.pokemon-list');
    // Create a new <li> element for the Pokemon
    const listItem = document.createElement('li');
    // Create a new <button> element for the Pokemon
    const button = document.createElement('button');
    // Set the text of the button to the Pokemon's name
    button.innerText = pokemon.name;
    // Add a class to the button for styling purposes
    button.classList.add('pokemon-button');
    // Add an event listener to the button that will show the Pokemon's details when clicked
    button.addEventListener('click', function() {
      loadDetails(pokemon).then(function() {
        showDetails(pokemon);
      });
    }); 
    // Append the button to the list item
    listItem.appendChild(button);
    // Append the list item to the <ul> element
    pokemonListElement.appendChild(listItem);
  };

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  
  // Return an object containing the add, getAll, and addListItem methods
  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,

  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
