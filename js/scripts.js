// Create a self-executing anonymous function that returns an object with methods for managing Pokemon data
const pokemonRepository = (() => {
  // Declare an array of Pokemon objects
  const pokemonList = [
    { name: 'Articuno', height: 1.7, types: ['Ice', 'Flying'] },
    { name: 'Snorlax', height: 2.1, types: ['Normal'] },
    { name: 'Gengar', height: 1.5, types: ['Ghost', 'Poison'] },
  ];

  // Method for adding a new Pokemon to the array
  const add = (pokemon) => {
    pokemonList.push(pokemon);
  };

  // Method for getting all Pokemon in the array
  const getAll = () => {
    return pokemonList;
  };

  // Method for showing details of a Pokemon
  const showDetails = (pokemon) => {
    console.log(pokemon);
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
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
    // Append the button to the list item
    listItem.appendChild(button);
    // Append the list item to the <ul> element
    pokemonListElement.appendChild(listItem);
  };

  // Return an object containing the add, getAll, and addListItem methods
  return {
    add,
    getAll,
    addListItem,
  };
})();

// For each Pokemon in the array, add a new list item to the <ul> element on the page
pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
});