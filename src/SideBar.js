import {useState} from 'react';

import Calendar from './Calendar';
import './css/SideBar.css';

export default function SideBar() {

    // which menu item is clicked
    let [clicked, setClicked] = useState(null);

    const toggleClicked = (state) => {
        if (clicked === state) {setClicked(null)}
        else {setClicked(state)}
    }

    const isClicked = (state) => (state === clicked);

    const clickedStyle = {'background-color': 'var(--white)', 'color': 'var(--black)'};

    const Item = (id, desc, children) => ({'id': id, 'desc': desc, 'children': children||null});

    const items =[Item('all', 'All Notes'), Item('tags','Tags',[]),
                  Item('date','Filter By Date', []), Item('search', 'Search', []), 
                  Item('trash', 'Trash / Archived Notes')];
    
    // but if one of the sidebar elements has a sublist we still want to expand that...
    // if one of 'items' has children, render those inside
    return (
    <ul className="sidebar">
        {items.map(item => 
            <li id={`sidebar-${item.id}`} style={isClicked(item.id) ? clickedStyle : null} onClick={() => toggleClicked(item.id)}>
                {item.desc}
                {isClicked(item.id) && item.children}
            </li>
        )}  
    </ul>
    );
}