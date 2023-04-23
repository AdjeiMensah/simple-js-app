let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let searchInput = document.querySelector("#search-input");

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Invalid pokemon data");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add('list-group-item');

    let button = document.createElement("button");
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    button.innerText = pokemon.name;

    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });

    listpokemon.appendChild(button);
    pokemonListElement.appendChild(listpokemon);
  }

  function loadList() {
    let listLoader = document.getElementById("loading-message");
    listLoader.removeAttribute('hidden');

    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          listLoader.setAttribute('hidden', '');
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;

    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
        showModal(pokemon);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon);
  }

  function showModal(pokemon) {
    let modalTitle = document.querySelector(".modal-title");
    modalTitle.innerText = pokemon.name;

    let pokemonImage = document.querySelector('.pokemon-image');
    pokemonImage.src = pokemon.imageUrl;

    let pokemonHeight = document.querySelector('.pokemon-height');
    pokemonHeight.innerText = 'Height: ' + (pokemon.height / 10) + ' m';
  }

  // Add search functionality
  searchInput.addEventListener("input", function () {
    filterSearch(searchInput);
  });

  function filterSearch(searchInput) {
    let filterValue = searchInput.value.toLowerCase();
  
    // filter the pokemonList array based on the filterValue
    let filteredPokemon = pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase().indexOf(filterValue) > -1;
    });
  
    // update the displayed list of Pokemon based on the filtered results
    let pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.innerHTML = "";
    filteredPokemon.forEach(function (pokemon) {
      addListItem(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    filterSearch: filterSearch,
  };
})();

// Load the list of Pokemon from the API and add them to the page when the page finishes loading
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});