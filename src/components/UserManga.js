import React, {useState, useEffect } from 'react'
import MangaContainer from './MangaContainer'

function UserManga({sessionToken, mangaList, retierveMangaInfo}) {


useEffect(() => {
  fetch(`https://api.mangadex.org/user/follows/manga?limit=100`, {
  headers: {
    Accept: "application/json",
    "authorization" : sessionToken
  }
})
.then(response => response.json())
.then(({data}) => {
  data.map((manga)=> {
    retierveMangaInfo(manga.id)
  })  
  })

}, [sessionToken])
  return (
    <div>
      <MangaContainer manga = {mangaList}/>
    </div>
  )
}

export default UserManga