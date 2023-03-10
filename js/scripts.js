let pokemonRepository = (function () {
  let pokemonList = [
      {name: 'Articuno', height: 1.7, types: ['Ice','Flying']},
      {name: 'Snorlax', height: 2.1, types: ['normal']},
      {name: 'Gengar', height: 1.5, types: ['Ghost','Poison']},
  ];
        
  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    },
    showDetails: function(pokemon) {
      console.log(pokemon);
    },
    addListItem: function(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add("pokemon-button");
      button.addEventListener('click', function() {
        pokemonRepository.showDetails(pokemon);
      })
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
    }
  };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});