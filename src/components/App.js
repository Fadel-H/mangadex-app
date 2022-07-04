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
   

    useEffect(() => {
 // post public manga data to json server
   mangaList.map((manga) => {
    return fetch(`https://mangadex-project.herokuapp.com/mangaList`,{ 
    method: "Post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(manga)
})
 }) 
    }, [mangaList])


    useEffect(() => {
      // post user manga data to json server
      userManga.map((manga) => {
       return fetch(`https://mangadex-project.herokuapp.com/userManga`,{ 
        method: "Post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(manga)
    })
     }) 
  }, [userManga])


  
    // useEffect(() => {
    //   let i = 0
    //   mangaList.map((list) => {
    //   return  userManga.map((user)=> {
    //    return user.id === list.id ? 
    //    mangaList[i].followStat = true : null
    //   })
    //   i++
    // })
    // setMangaList(mangaList)
    // }, [userManga])

     //update username and password when inputted in the login form
    function onChange(e){
      if (e.target.name=== "username"){
        setLogin({...login, username: e.target.value})
      } else {
        setLogin({...login, password: e.target.value})
      }
     
    }


    // retierve id, title, description, cover art, and page url for manga
    function retierveMangaInfo(manga,setManga,id, stat, type ){
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

    //login in user
    function onLoginSubmit(e){
      e.preventDefault()
        fetch("https://api.mangadex.org/auth/login", {
     method: 'POST',
    headers:{ 'Content-Type' : 'application/json'},
    body: JSON.stringify(login),
    redirect: 'follow'})
      .then(response => response.json())
      .then(data => {
        setSessionToken(data.token.session)})
    }

    //updata manga follow stat
    function handleFollow(id, stat, type){
      if (stat){
        console.log(id)
        console.log(stat)
  
        fetch(`https://api.mangadex.org/manga/${id}/follow`, {
          headers: {
            Accept: "application/json",
            "authorization" : sessionToken
          },
          method: 'POST'})
  
  
        fetch(`https://mangadex-project.herokuapp.com/${type}/${id}`, {
          method: "PATCH",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            "followStat" : true
          })
        })
  
      } else {
        console.log(id)
        console.log(stat)
        // fetch(`https://api.mangadex.org/manga/${id}/follow`, {
        //   headers: {
        //     Accept: "application/json",
        //     "authorization" : sessionToken
        //   },
        //   method: "DELETE"
      // })
  
      fetch(`https://mangadex-project.herokuapp.com/${type}/${id}`, {
          method: "PATCH",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            "followStat" : false
          })
        })
  }
  }

 

  return (

    <div className="p-3 mb-2 bg-dark text-white ">
    <NavBar/>
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
          />}>
      </Route>
      <Route exact path="/manga-list" 
           element={<MangaList 
           retierveMangaInfo={retierveMangaInfo} 
           mangaList={mangaList} 
           setMangaList={setMangaList}
           handleFollow={handleFollow}
           userManga={userManga}
           />}>
      </Route>
      </Routes>
  </div>

   
  )
}


export default App;
