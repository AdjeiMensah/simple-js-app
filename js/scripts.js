// Declare pokemonRepository as an IIFE
let pokemonRepository = (function () {
  // Initialize pokemonList and apiUrl
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  
  // Function to add a valid Pokemon object to the list
  function add(pokemon){ 
    if (typeof pokemon === 'object' &&
       'name' in pokemon &&
       'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Invalid Pokémon');
    }
  }
  
  // Function to get all Pokemon objects in the list
  function getAll(){ 
    return pokemonList;
  }
  
  // Function to create Pokemon items and add them to the DOM
  function addPokemonItem(pokemon){ 
    let pokemonListAdd = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    pokemonItem.classList.add('list-group-item');

    let pokemonButton = document.createElement('button');
    pokemonButton.classList.add('pokemon-button');

    pokemonButton.classList.add('btn');
    pokemonButton.setAttribute('data-toggle', 'modal');
    pokemonButton.setAttribute('data-target', '#bootstrapModal');

    pokemonButton.innerText = pokemon.name;

    pokemonItem.appendChild(pokemonButton);
    pokemonListAdd.appendChild(pokemonItem);

    pokemonButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
  };

  // Function to show Pokemon details in a modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
      showModal(pokemon);
    });
  }

  // Function to load the list of Pokemon from the API
  function loadList() {
    let listLoader = document.getElementById("loading-message");
    listLoader.removeAttribute('hidden');

    return fetch(apiUrl)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };

        add(pokemon);

        listLoader.setAttribute('hidden', '');
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // Function to load the details of a single Pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
    .then(function(response){
      return response.json();
    }).then(function(details){
      item.id = details.id;
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function(e){
      console.error(e);
    });
  }

  // Function to populate and display the modal with Pokemon details
  function showModal(item) {
    pokemonRepository.loadDetails(item).then(function () {
  
      let pokemonImage = document.querySelector('.pokemon-image');
      pokemonImage.src = item.imageUrl;
      
      let pokemonId = document.querySelector('.pokemon-id');
      pokemonId.innerText = '#' + item.id;
  
      let pokemonName = document.querySelector('.pokemon-name');
      pokemonName.innerText = item.name;
  
      let pokemonHeight = document.querySelector('.pokemon-height');
      pokemonHeight.innerText = '> ' + (item.height/10) + ' m';
  
      let itemTypes = "";
      item.types.forEach(function(types) {
        itemTypes += ["<li>" + types.type.name + "</li>"];
      });
      let pokemonTypes = document.querySelector('.pokemon-types');
      pokemonTypes.innerHTML = itemTypes;
      let itemAbilities = "";
      item.abilities.forEach(function(abilities) {
        itemAbilities += ["<li>" + abilities.ability.name + "</li>"];
      });
      let pokemonAbilities = document.querySelector('.pokemon-abilities');
      pokemonAbilities.innerHTML = itemAbilities;
  
      // Handle touch events for the modal
      let startX;
      let modalContainer = document.querySelector('.modal-content');
      modalContainer.addEventListener('touchend', function(e) {
        let endX = e.changedTouches[0].clientX;
        let diffX = startX - endX;
        if (diffX > 80) {
          showNextPokemon();
        } else if (diffX < -80) {
          showPreviousPokemon();
        }
      }, false);

      // Function to display the next Pokemon in the modal
      function showNextPokemon() {
        let currentIndex = pokemonRepository.getAll().indexOf(item);
        if (currentIndex === pokemonRepository.getAll().length - 1) {
          currentIndex = 0;
        } else {
          currentIndex++;
        }
        item = pokemonRepository.getAll()[currentIndex];
        showModal(item);
      }

      // Function to display the previous Pokemon in the modal
      // Function to display the previous Pokemon in the modal
      function showPreviousPokemon() {
        let currentIndex = pokemonRepository.getAll().indexOf(item);
        if (currentIndex === 0) {
          currentIndex = pokemonRepository.getAll().length - 1;
        } else {
          currentIndex--;
        }
        item = pokemonRepository.getAll()[currentIndex];
        showModal(item);
      }

    });
  }

  // Function to search for Pokemon based on user input
  function searchPokemon() {
    let searchInput = document.getElementById('search-input');
    let searchText = searchInput.value.toLowerCase();
    let allPokemon = document.querySelectorAll('.list-group-item');

    allPokemon.forEach(function(pokemon) {
      let pokemonText = pokemon.querySelector('.pokemon-button').innerText.toLowerCase();
      let searchList = document.querySelector('.pokemon-list');

      if (pokemonText.includes(searchText)) {
        searchList.classList.add('search-list');
        pokemon.style.display = 'inline-block';
      } else {
        pokemon.style.display = 'none';
      }

      if (!searchInput.value) {
        searchList.classList.remove('search-list');
      }

    });
  }  

  // Event listener for search input field
  let searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", function () {
    searchPokemon();
  });

  // Return the available methods of the pokemonRepository object
  return {
    add,
    getAll,
    addPokemonItem,
    loadList,
    loadDetails, 
    showModal,
  };
})(); //IIFE ENDS

// Load the list of Pokemon and display them on the page
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addPokemonItem(pokemon)
  });
});
