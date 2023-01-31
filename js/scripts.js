let pokemonList = [
    {name: 'Articuno', height: 1.7, types: ['Ice','Flying']},
    {name: 'Snorlax', height: 2.1, types: ['normal']},
    {name: 'Gengar', height: 1.5, types: ['Ghost','Poison']},
];
    
for (let i=0; i < pokemonList.length; i++){
if(pokemonList[i].height>2){
    document.write(pokemonList[i].name + " (height: " +pokemonList[i].height+") "+ "Wow, thats big!") ;
}
else{
    document.write(pokemonList[i].name + " (height: " +pokemonList[i].height+")" )
}
    }