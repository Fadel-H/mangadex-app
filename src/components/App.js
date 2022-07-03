import React, {useState, useEffect}from 'react'
import { Route, Routes } from "react-router-dom"
import NavBar from './NavBar'
import Login from './Login'
import MangaList from './MangaList'
import UserManga from './UserManga'

function App() {
    const [login, setLogin] = useState({
      username: "",
      password: ""
    })
    const [sessionToken, setSessionToken] = useState("")
  
    function onChange(e){
      if (e.target.name=== "username"){
        setLogin({...login, username: e.target.value})
      } else {
        setLogin({...login, password: e.target.value})
      }
     
    }

    function onLoginSubmit(e){
      e.preventDefault()
      console.log(login)

        fetch("https://api.mangadex.org/auth/login", {
     method: 'POST',
    headers:{ 'Content-Type' : 'application/json'},
    body: JSON.stringify(login),
    redirect: 'follow'})
      .then(response => response.json())
      .then(data => setSessionToken(data.token.session))
    }

  //   useEffect (() => {
  //     fetch("https://api.mangadex.org/auth/login", {
  //  method: 'POST',
  // headers:{ 'Content-Type' : 'application/json'},
  // body: JSON.stringify(login),
  // redirect: 'follow'})
  //   .then(response => response.json())
  //   .then(data => setSessionToken(data.token.session))}
  //   , [])

  return (

    <div className="p-3 mb-2 bg-dark text-white ">
    <NavBar/>
      <Routes>
      <Route path="/" 
          element={<Login onLoginSubmit={onLoginSubmit} onChange={onChange}/>}>
      </Route>
      <Route path="/user-manga" 
          element={<UserManga sessionToken={sessionToken}/>}>
      </Route>
      <Route path="/manga-list" 
           element={<MangaList/>}>
      </Route>
      </Routes>
  </div>

   
  )
}


export default App;
