
import { useParams } from "react-router-dom";
import "./PokemonDetails.css"
import usePokemonDetail from "../../hooks/usePokemonDetail";

function PokemonDetails({pokemonName}) {
    const { id } = useParams();
    const [pokemon,pokemonListState,isLoading]=usePokemonDetail(id,pokemonName);
    return (
        <>
            <div className="pokemon-details-wrapper">
                <div className="pokemon-details-name"> <span>{pokemon.name}</span></div>
                <img src={pokemon.image} alt={pokemon.name} className="pokemon-details-image" />
                <div className="pokemon-details-name">Height :{pokemon.height} </div>
                <div className="pokemon-details-name">Weight: {pokemon.weight} </div>
                <div className="pokemon-details-types">
                    {pokemon.types && pokemon.types.map((t) => (
                        <div key={t}>{t}</div>
                    ))}
                </div>
             {pokemon.types  &&
                <div>
                    More {pokemon.types[0]} type pokemons
                    <ul>
                        {pokemonListState.pokemonList && pokemonListState.pokemonList.map((p)=><li key={p.pokemon.url}>{p.pokemon.name}</li>)}
                    </ul>
                </div>
              }
            </div>
        </>
    );
}

export default PokemonDetails;
