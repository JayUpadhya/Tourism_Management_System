import React from 'react'
import './SearchBar.css'
import searchIcon from '../images/Destination/searchicon.png'

export default function SearchBar() {
  return (
    <div className='search-bar'>
        <input className='search-type' type='text' placeholder='Destination'></input>
        <button className='search-button'><img src={searchIcon}></img></button>
    </div>
  );
}
