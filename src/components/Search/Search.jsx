
import useDebounce from "../../hooks/useDebounce";
import "./Search.css";

function Search({updateSearchTerm}){
    const handleChange=(event)=>{
        updateSearchTerm(event.target.value);
    };
    const DebounceCallBack=useDebounce(handleChange);
    return(
        <div className="search-wrapper">
         <input type="text" 
         id ="pokemon-name-search" 
         placeholder="pokemon name....."
         onChange={DebounceCallBack} 
         />
        </div>
    )

}
export default Search;