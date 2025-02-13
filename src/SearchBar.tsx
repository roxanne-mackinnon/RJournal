import {useEffect, useContext} from 'react';
import { SearchFilteringContext, SearchFilteringContextParams } from './Contexts';
import './css/SearchBar.css';

export default function SearchBar() {
    const searchFilterParams = useContext<SearchFilteringContextParams|null>(SearchFilteringContext);
    if (searchFilterParams === null) throw new Error("SearchFilteringContext cannot be null.");

    const [searchTerm, setSearchTerm] = searchFilterParams;

    // reset search term if component is unmounted
    useEffect(() => {
        return () => setSearchTerm("");
    }, [])

    return (
    <input className="search-bar" type="text" value={searchTerm}
        onChange={(e: {target: HTMLInputElement}) => setSearchTerm(e.target.value)}
        onClick={e => e.stopPropagation()}>
    </input>);
}