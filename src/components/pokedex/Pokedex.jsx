import { useEffect, useState } from "react";
import Search from "../Search/Search";
import PokemonList from "../pokemonList/PokemonList";
import "./Pokedex.css";
import PokemonDetails from "../pokemonDetails/PokemonDetails";

function Pokedex(){
    const[searchTerm,setSearchTerm]=useState('');

    return(
        <div className="pokedex-wrapper">
        <Search updateSearchTerm={setSearchTerm} />
        {(!searchTerm) ?<PokemonList /> : <PokemonDetails key={searchTerm} pokemonName={searchTerm}/>}
        </div>
    )

}
export default Pokedex;