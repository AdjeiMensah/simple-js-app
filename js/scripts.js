
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
    if(pokemon.height>2){
        document.write(pokemon.name + " (height: " +pokemon.height+") "+ "Wow, thats big!") ;
    }
    else{
        document.write(pokemon.name + " (height: " +pokemon.height+")" )
    }
}
pokemonRepository.getAll().forEach(printdetails);
