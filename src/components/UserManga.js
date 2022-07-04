import React, {useState, useEffect } from 'react'
import MangaContainer from './MangaContainer'

function UserManga({sessionToken,
   userManga, 
   setUserManga, 
   retierveMangaInfo, 
   handleFollow, 
   setMangaUserJson,
   mangaUserJson,
   loggedIn
  }) {


    useEffect(() => {
      fetch(`https://mangadex-project.herokuapp.com/userManga`)
      .then(resp => resp.json())
      .then(data => setMangaUserJson(data))
    }, [userManga, handleFollow])


useEffect(() => {
  if (loggedIn === "ok"){ 
    fetch(`https://api.mangadex.org/user/follows/manga?limit=50`, {
    headers: {
      Accept: "application/json",
      "authorization" : sessionToken
    }
  })
  .then(response => response.json())
  .then(({data}) => {
    data.map((manga)=> {
      retierveMangaInfo(userManga, setUserManga, manga.id, "userManga", true )
    })
    })}
 

}, [sessionToken, handleFollow])
  return (
    <div>
      <MangaContainer manga = {mangaUserJson} handleFollow={handleFollow}/>
    </div>
  )
}

export default UserManga
