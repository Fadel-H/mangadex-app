import React, {useState, useEffect}from 'react'
import {Route, Routes } from "react-router-dom"
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
    const [mangaList,setMangaList]= useState([])

    //update username and password when inputted in the login form
    function onChange(e){
      if (e.target.name=== "username"){
        setLogin({...login, username: e.target.value})
      } else {
        setLogin({...login, password: e.target.value})
      }
     
    }

    // retierve id, title, description, cover art, and page url for manga
    function retierveMangaInfo(id){
      fetch(`https://api.mangadex.org/manga/${id}?includes[]=author&includes[]=artist&includes[]=cover_art`)
    .then(resp => resp.json())
    .then(({data}) => { 
      let mangaData = {author: [], artist:[]}
      let bool = false

      bool = mangaList.find((manga)=> manga.id === id )
      
      if (!bool){
      for (let element of data.relationships){
        if (element.type === "author"){
          mangaData.author.push(`|${element.attributes.name}|`)
        } else if (element.type === "artist"){
          mangaData.artist.push(`|${element.attributes.name}|`)
        } else if (element.type === "cover_art"){
          setMangaList((mangaList) =>  [...mangaList, {
            id: data.id,
            title: Object.values(data.attributes.title)[0],
            description: data.attributes.description['en'],
            coverArt :`https://mangadex.org/covers/${id}/${element.attributes.fileName}`,
            url: `https://mangadex.org/title/${id}`,
            ...mangaData
          }
        ])
        }}}
        })
    }

    //login in user
    function onLoginSubmit(e){
      e.preventDefault()
        fetch("https://api.mangadex.org/auth/login", {
     method: 'POST',
    headers:{ 'Content-Type' : 'application/json'},
    body: JSON.stringify(login),
    redirect: 'follow'})
      .then(response => response.json())
      .then(data => setSessionToken(data.token.session))
    }



  return (

    <div className="p-3 mb-2 bg-dark text-white ">
    <NavBar/>
      <Routes>
      <Route path="/" 
          element={<Login onLoginSubmit={onLoginSubmit} onChange={onChange}/>}>
      </Route>
      <Route path="/user-manga" 
          element={<UserManga sessionToken={sessionToken} retierveMangaInfo={retierveMangaInfo} mangaList={mangaList}/>}>
      </Route>
      <Route path="/manga-list" 
           element={<MangaList retierveMangaInfo={retierveMangaInfo} mangaList={mangaList}/>}>
      </Route>
      </Routes>
  </div>

   
  )
}


export default App;
