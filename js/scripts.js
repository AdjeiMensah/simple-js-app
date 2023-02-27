
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
          }
        };
      })();
    

function printdetails(pokemon) {
    if(pokemonList.height>2){
        document.write(pokemonList.name + " (height: " +pokemonList.height+") "+ "Wow, thats big!") ;
    }
    else{
        document.write(pokemonList.name + " (height: " +pokemonList.height+")" )
    }
}
pokemonRepository.getAll().forEach(printdetails);
