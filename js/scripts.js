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

  // Function for loading a list of Pokemon from the API
  function loadList() {
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Loop through each item in the results array returned by the API
        data.results.forEach(item => {
          // Create a new Pokemon object with the name and details URL from the API
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          // Add the Pokemon to the array
          add(pokemon);
        });
      })
      .catch(error => console.error(error));
  }

  // Function for loading the details of a specific Pokemon from its details URL
  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(response => response.json())
      .then(data => {
        // Add additional properties to the Pokemon object based on the details returned by the API
        pokemon.imageUrl = data.sprites.front_default;
        pokemon.height = data.height;
        pokemon.types = data.types;
      })
      .catch(error => console.error(error));
  }

  // Function for showing the details of a specific Pokemon in the console
  function showDetails(pokemon) {
    showModal(pokemon);
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container');

    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let myImage = document.createElement('img');
    myImage.setAttribute('src', pokemon.imageUrl);

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;



    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(myImage);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);



    modalContainer.classList.add('is-visible');
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
    });


  // Return an object containing the add, getAll, and addListItem methods, as well as the loadList and loadDetails functions
  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
  };
})();

// Load the list of Pokemon from the API and add them to the page when the page finishes loading
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
  });
});