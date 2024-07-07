import "./PokemonList.css";
import Pokemon from "../pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList() {
    const [pokemonListState, setPokemonListState] = usePokemonList('https://pokeapi.co/api/v2/pokemon', false);

    const handlePrevious = () => {
        if (pokemonListState.prevUrl) {
            setPokemonListState(prevState => ({
                ...prevState,
                pokedexUrl: pokemonListState.prevUrl
            }));
        }
    };

    const handleNext = () => {
        if (pokemonListState.nextUrl) {
            setPokemonListState(prevState => ({
                ...prevState,
                pokedexUrl: pokemonListState.nextUrl
            }));
        }
    };

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {pokemonListState.isLoading ? (
                    'Loading.......'
                ) : (
                    pokemonListState.pokemonList.map(p => (
                        <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
                    ))
                )}
            </div>
            <div className="controler">
                <button disabled={!pokemonListState.prevUrl} onClick={handlePrevious}>Previous</button>
                <button disabled={!pokemonListState.nextUrl} onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;
