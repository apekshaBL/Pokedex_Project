import usePokemonList from "./usePokemonList";
import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonDetail(id,pokemonName) {
    const [pokemon, setPokemon] = useState({
        name: "",
        image: "",
        weight: 0,
        height: 0,
        types: []
    });

    const [isLoading, setIsLoading] = useState(true);
    const [pokemonListState, setPokemonListState] = usePokemonList(`https://pokeapi.co/api/v2/type/fire`, true);

    async function downloadPokemon() {
        try {
            let response;
            if(pokemonName){
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            }
            else{
               response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            }
            const types = response.data.types.map((t) => t.type.name);
            setPokemon({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                weight: response.data.weight,
                height: response.data.height,
                types: types
            });

            setPokemonListState((prevState) => ({
                ...prevState,
                pokedexUrl: `https://pokeapi.co/api/v2/type/${types[0] || 'fire'}`
            }));

            setIsLoading(false);
        } catch (err) {
            console.log("error in fetching pokemon", err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, []);

    return [pokemon, pokemonListState, isLoading];
}

export default usePokemonDetail;
