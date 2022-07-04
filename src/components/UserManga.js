import React, {useState, useEffect } from 'react'
import MangaContainer from './MangaContainer'

function UserManga({sessionToken,
   userManga, 
   setUserManga, 
   retierveMangaInfo, 
   handleFollow
  }) {

const [mangaUserJson,setMangaUserJson]= useState([])

useEffect(() => {
  fetch(`https://mangadex-project.herokuapp.com/userManga`)
  .then(resp => resp.json())
  .then(data => setMangaUserJson(data))
}, [handleFollow])


useEffect((retierveMangaInfo,userManga,setUserManga) => {
  fetch(`https://api.mangadex.org/user/follows/manga?limit=100`, {
  headers: {
    Accept: "application/json",
    "authorization" : sessionToken
  }
})
.then(response => response.json())
.then(({data}) => { console.log("user", data)
  data.map((manga)=> {
   return retierveMangaInfo(userManga, setUserManga, manga.id, true, "userManga")
  })
  })

}, [sessionToken])
  return (
    <div>
      <MangaContainer manga = {mangaUserJson} handleFollow={handleFollow}/>
    </div>
  )
}

export default UserManga






