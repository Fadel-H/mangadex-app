import React from 'react'
import {NavLink} from "react-router-dom"


function NavBar() {
  return (
    <nav >
      <NavLink to="/">Login </NavLink>
      <NavLink to="/user-manga">UserManga </NavLink>
      <NavLink to="/manga-list">MangaList</NavLink>
    </nav>
  )
}

export default NavBar
