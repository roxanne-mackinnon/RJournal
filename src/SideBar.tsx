import {useState} from 'react';

import SearchBar from './SearchBar';
import Calendar from './Calendar';
import './css/SideBar.css';


export type SideBarItem = {
    id: string;
    desc: string;
    children?: React.JSX.Element[] | null;
    onSelect: () => void;
};

export function SideBarItem(id: string,
                     desc: string,
                     children: React.JSX.Element[] | null = null,
                     onSelect: (() => void) = ()=>{}) : SideBarItem {
    return {'id': id, 'desc': desc, 'children': children, 'onSelect': onSelect};
}

export function SideBar({items}: {items: SideBarItem[]}) {

    // which menu item is clicked
    let [clicked, setClicked] = useState<SideBarItem|null>(null);

    const toggleClicked = (state: SideBarItem) => {
        if (clicked === state) {setClicked(null)}
        else {
            setClicked(state)
            state.onSelect();
        }
    }

    const isClicked = (item: SideBarItem) : boolean => clicked ? item.id===clicked.id : false;

    const clickedStyle = {backgroundColor: 'var(--white)', color: 'var(--black)'};

    // but if one of the sidebar elements has a sublist we still want to expand that...
    // if one of 'items' has children, render those inside
    return (
    <ul className="sidebar">
        {items.map(item => 
            <li className="sidebar-item" id={`sidebar-item-${item.id}`} style={isClicked(item) ? clickedStyle : undefined} onClick={() => toggleClicked(item)}>
                {<p>{item.desc}</p>}
                {isClicked(item) && item.children}
            </li>
        )}  
    </ul>
    );
}