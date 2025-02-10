import {useState} from 'react';

import SearchBar from './SearchBar';
import Calendar from './Calendar';
import './css/SideBar.css';


type Item = {
    id: string;
    desc: string;
    children?: React.JSX.Element[] | null;
};

function Item(id: string, desc: string, children: React.JSX.Element[] | null = null) : Item {
    return {'id': id, 'desc': desc, 'children': children};
}
export default function SideBar() {

    // which menu item is clicked
    let [clicked, setClicked] = useState<Item|null>(null);

    const toggleClicked = (state: Item) => {
        if (clicked === state) {setClicked(null)}
        else {setClicked(state)}
    }

    const isClicked = (item: Item) : boolean => clicked ? item.id===clicked.id : false;

    const clickedStyle = {backgroundColor: 'var(--white)', color: 'var(--black)'};

    const items =[Item('all', 'All Notes'),
                  Item('tags','Tags',[]),
                  Item('date','Filter By Date', [<Calendar />]),
                  Item('search', 'Search', [<SearchBar />]), 
                  Item('trash', 'Trash / Archived Notes')];
    
    // but if one of the sidebar elements has a sublist we still want to expand that...
    // if one of 'items' has children, render those inside
    return (
    <ul className="sidebar">
        {items.map(item => 
            <li className="sidebar-item" id={`sidebar-item-${item.id}`} style={isClicked(item) ? clickedStyle : undefined} onClick={() => toggleClicked(item)}>
                {<div className="sidebar-item">{item.desc}</div>}
                {isClicked(item) && item.children}
            </li>
        )}  
    </ul>
    );
}