import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(url, types) {
    
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: url,
        nextUrl: '',
        prevUrl: '',
    });

    async function downloadPokemons() {
        setPokemonListState((state) => ({ ...state, isLoading: true }));

        try {
            const response = await axios.get(pokemonListState.pokedexUrl);

            // Handling types
            if (types) {
                // Type-specific logic
                setPokemonListState((state) => ({
                    ...state,
                    pokemonList: response.data.pokemon ? response.data.pokemon.slice(0, 8) : [],
                    nextUrl: response.data.next,
                    prevUrl: response.data.previous,
                    isLoading: false
                }));
            } else {
                // General Pokémon fetching logic
                const pokemonResults = response.data.results;
                const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
                const pokemonData = await axios.all(pokemonResultPromise);

                const pokeListResult = pokemonData.map((pokeData) => {
                    const pokemon = pokeData.data;
                    return {
                        id: pokemon.id,
                        name: pokemon.name,
                        image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                        types: pokemon.types
                    };
                });

                setPokemonListState((state) => ({
                    ...state,
                    pokemonList: pokeListResult,
                    nextUrl: response.data.next,
                    prevUrl: response.data.previous,
                    isLoading: false
                }));
            }
        } catch (error) {
            console.log("Error fetching Pokémon data:", error);
            setPokemonListState((state) => ({
                ...state,
                isLoading: false
            }));
        }
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);

    return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
