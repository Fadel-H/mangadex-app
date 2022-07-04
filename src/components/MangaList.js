import React, {useState, useEffect} from 'react'
import MangaContainer from "./MangaContainer"

function MangaList({retierveMangaInfo, mangaList, setMangaList}) {
  const [mangaListJson,setMangaListJson]= useState([])
  //fetch manga IDs from public url

  useEffect((retierveMangaInfo,mangaList, setMangaList)=> {
    fetch("https://api.mangadex.org/manga?limit=20&year=2022&includedTagsMode=AND&excludedTagsMode=OR&publicationDemographic%5B%5D=shounen&contentRating%5B%5D=safe&order%5BlatestUploadedChapter%5D=desc", {
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => response.json())
.then(({data}) => {
data.map((manga)=> {
 return retierveMangaInfo(mangaList, setMangaList, manga.id, false, "mangaList")
})  
})
}, [])

useEffect(() => {
  fetch(`https://mangadex-project.herokuapp.com/mangaList`)
  .then(resp => resp.json())
  .then(data => setMangaListJson(data))
}, [])

  return (
    <div>
      <MangaContainer manga ={mangaListJson} 
      // handleFollow={handleFollow}
      /> 
    </div>
  )
}

export default MangaList



