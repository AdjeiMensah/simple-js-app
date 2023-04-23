let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  function add(pokemon) {
    if (typeof pokemon === 'object' &&
      'name' in pokemon &&
      'url' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Invalid pokemon data');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
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
            url: item.url
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
    let url = pokemon.url;

    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types.map(function (type) {
          return type.type.name;
        });
        pokemon.abilities = details.abilities.map(function (ability) {
          return ability.ability.name;
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalTitle = document.querySelector('.modal-title');
      modalTitle.innerText = pokemon.name;

      let modalBody = document.querySelector('.modal-body');
      modalBody.innerHTML = '';

      let pokemonImage = document.createElement('img');
      pokemonImage.src = pokemon.imageUrl;
      pokemonImage.classList.add('img-fluid');
      modalBody.appendChild(pokemonImage);

      let pokemonHeight = document.createElement('p');
      pokemonHeight.innerText = 'Height: ' + pokemon.height;
      modalBody.appendChild(pokemonHeight);

      let pokemonTypes = document.createElement('p');
      pokemonTypes.innerText = 'Types: ' + pokemon.types.join(', ');
      modalBody.appendChild(pokemonTypes);

      let pokemonAbilities = document.createElement('p');
      pokemonAbilities.innerText = 'Abilities: ' + pokemon.abilities.join(', ');
      modalBody.appendChild(pokemonAbilities);
    });
  }

  // Add search functionality
  let searchInput = document.querySelector('#search-input');
  searchInput.addEventListener('input', function () {
    let searchValue = searchInput.value.toLowerCase();
    let filteredPokemon = pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase().includes(searchValue);
    });
    // Clear current list
    let pokemonListElement = document.querySelector('.pokemon-list');
    pokemonListElement.innerHTML = '';
    // Add filtered list items
    filteredPokemon.forEach(function (pokemon) {
      addListItem(pokemon);
    });
  });
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });