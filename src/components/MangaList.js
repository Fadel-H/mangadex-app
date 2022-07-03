import React, {useState, useEffect} from 'react'
import MangaContainer from "./MangaContainer"

function MangaList({retierveMangaInfo, mangaList}) {

  //fetch manga IDs from public url
  useEffect(()=> {
    fetch("https://api.mangadex.org/manga?limit=100&year=2022&includedTagsMode=AND&excludedTagsMode=OR&publicationDemographic%5B%5D=shounen&contentRating%5B%5D=safe&order%5BlatestUploadedChapter%5D=desc", {
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => response.json())
.then(({data}) => {
data.map((manga)=> {
  retierveMangaInfo(manga.id)
})  
})
}, [])



  return (
    <div>
      <MangaContainer manga = {mangaList}/> 
    </div>
  )
}

export default MangaList



