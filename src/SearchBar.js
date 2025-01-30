import {useContext} from 'react';
import { SearchFilteringContext } from './Contexts';
import './css/SearchBar.css';

export default function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useContext(SearchFilteringContext);

    return (<input className="search-bar" type="text" value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)} {...props}>
            </input>);
}