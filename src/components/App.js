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
    const [mangaList, setMangaList]= useState([])
    const [userManga, setUserManga]= useState([])   
    const [loginStat, setLoginStat]= useState(false)
    const [loggedIn, setLoggedIn] = useState('')
    const [mangaUserJson,setMangaUserJson]= useState([])
    const [mangaListJson,setMangaListJson]= useState([])

    //Clean backend json objects
    useEffect(() => {
      fetch(`https://mangadex-project.herokuapp.com/userManga`)
      .then(resp => resp.json())
      .then(data => setMangaUserJson(data))

      mangaUserJson.map((manga)=> fetch(`https://mangadex-project.herokuapp.com/userManga/${manga.id}`,{method: "DELETE"}))

      fetch(`https://mangadex-project.herokuapp.com/mangaList`)
      .then(resp => resp.json())
      .then(data => setMangaListJson(data))

      mangaListJson.map((manga)=> fetch(`https://mangadex-project.herokuapp.com/mangaList/${manga.id}`,{method: "DELETE"}))
    
    }, [])




    useEffect(() => {
 // post public manga data to json server
   mangaList.map((manga) => {
   return( fetch(`https://mangadex-project.herokuapp.com/mangaList`,{ 
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(manga)
}))
 }) 
    }, [mangaList])


    useEffect(() => {
      // post user manga data to json server
      userManga.map((manga) => {
       return (fetch(`https://mangadex-project.herokuapp.com/userManga`,{ 
        method: "Post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(manga)
    }))
     }) 
  }, [userManga])


    //update username and password when inputted in the login form
    function onChange(e){
      if (e.target.name=== "username"){
        setLogin({...login, username: e.target.value})
      } else {
        setLogin({...login, password: e.target.value})
      }
     
    }

    // retierve id, title, description, cover art, and page url for manga
    function retierveMangaInfo(manga,setManga,id, type, stat =false ){
      fetch(`https://api.mangadex.org/manga/${id}?includes[]=author&includes[]=artist&includes[]=cover_art`)
    .then(resp => resp.json())
    .then(({data}) => { 
      let mangaData = {author: [], artist:[]}
      let bool = false

      bool = manga.find((manga)=> manga.id === id )
      
      if (!bool){
      for (let element of data.relationships){
        if (element.type === "author"){
          mangaData.author.push(`|${element.attributes.name}|`)
        } else if (element.type === "artist"){
          mangaData.artist.push(`|${element.attributes.name}|`)
        } else if (element.type === "cover_art"){
          setManga((manga) =>  [...manga, {
            id: data.id,
            title: Object.values(data.attributes.title)[0],
            description: data.attributes.description['en'],
            coverArt :`https://mangadex.org/covers/${id}/${element.attributes.fileName}`,
            url: `https://mangadex.org/title/${id}`,
            followStat : stat,
            type: type,
            ...mangaData
          }
        ])
        }}     
      }
        })


        
    }

    //login user
    function onLoginSubmit(e){
      e.preventDefault()
        fetch("https://api.mangadex.org/auth/login", {
     method: 'POST',
    headers:{ 'Content-Type' : 'application/json'},
    body: JSON.stringify(login),
    redirect: 'follow'})
      .then(response => response.json())
      .then(data => {
        setLoggedIn(data.result)
        setSessionToken(data.token.session)
      setLoginStat(true)})
    }

    //logout user
    function handleLogOut(e){
      e.stopPropagation()
      if(loggedIn === "ok"){
      setLoginStat(false)

     fetch("https://api.mangadex.org/auth/logout", {
      headers: {
        Accept: "application/json"
      },
      method: "POST"
    })

    mangaUserJson.map((manga)=> fetch(`https://mangadex-project.herokuapp.com/userManga/${manga.id}`, {
      headers: {
        Accept: "application/json"
      },
      method: "Delete"
    }))

    }}

    //updata manga follow stat
    function handleFollow(id, stat, manga){
      if (!stat && loggedIn === "ok"){

        fetch(`https://mangadex-project.herokuapp.com/mangaList/${id}`, {
          method: "PATCH",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            "followStat" : true
          })
        })


        fetch(`https://api.mangadex.org/manga/${id}/follow`, {
          headers: {
            Accept: "application/json",
            "authorization" : sessionToken
          },
          method: 'POST'})

        fetch(`https://mangadex-project.herokuapp.com/userManga`,{ 
            method: "Post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(manga)})

        fetch(`https://mangadex-project.herokuapp.com/mangaList`)
        .then(resp=> resp.json())
        .then(data => setMangaListJson(data))

      } else if (stat && loggedIn === "ok") {

        fetch(`https://api.mangadex.org/manga/${id}/follow`, {
          headers: {
            Accept: "application/json",
            "authorization" : sessionToken
          },
          method: "DELETE"
      })

      fetch(`https://mangadex-project.herokuapp.com/mangaList/${id}`, {
          method: "PATCH",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            "followStat" : false
          })
        })
  
      fetch(`https://mangadex-project.herokuapp.com/userManga/${id}`, {
        headers: {
          Accept: "application/json"
        },
        method: "Delete"
      })

      fetch(`https://mangadex-project.herokuapp.com/mangaList/${id}`, {
        method: "PATCH",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          "followStat" : false
        })
      })

      fetch(`https://mangadex-project.herokuapp.com/userManga`)
      .then(resp=> resp.json())
      .then(data => setMangaUserJson(data))
  }
  }

  

  return (

    <div className="p-3 mb-2 bg-dark text-white ">
    <NavBar handleLogOut={handleLogOut} loginStat={loginStat} />
      <Routes>
      <Route path="/" 
          element={<Login onLoginSubmit={onLoginSubmit} onChange={onChange}/>}>
      </Route>
      <Route exact path="/user-manga" 
          element={<UserManga 
          sessionToken={sessionToken} 
          retierveMangaInfo={retierveMangaInfo} 
          userManga={userManga}
          setUserManga={setUserManga}
          handleFollow={handleFollow}
          mangaList={mangaList}
          setMangaList={setMangaList}
          mangaUserJson={mangaUserJson}
          setMangaUserJson={setMangaUserJson}
          loggedIn= {loggedIn}
          />}>
      </Route>
      <Route exact path="/manga-list" 
           element={<MangaList 
           retierveMangaInfo={retierveMangaInfo} 
           mangaList={mangaList} 
           setMangaList={setMangaList}
           handleFollow={handleFollow}
           userManga={userManga}
           mangaListJson={mangaListJson}
           setMangaListJson={setMangaListJson}
           />}>
      </Route>
      </Routes>
  </div>

   
  )
}


export default App;