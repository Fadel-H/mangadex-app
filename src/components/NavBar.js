import React from 'react'
import {NavLink} from "react-router-dom"


function NavBar({loginStat, handleLogOut, onMangaList}) {
  return (
    <nav >
      <NavLink to="/" onClick={(e) =>handleLogOut(e)}>{loginStat ? "logout" :"login"} </NavLink>
      <NavLink to="/user-manga">UserManga </NavLink>
      <NavLink to="/manga-list">MangaList</NavLink>
    </nav>
  )
}

export default NavBar
