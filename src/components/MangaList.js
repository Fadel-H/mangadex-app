import React, {useEffect} from 'react'
import MangaContainer from "./MangaContainer"

function MangaList({retierveMangaInfo, mangaList, setMangaList, mangaListJson, setMangaListJson, handleFollow}) {
  //fetch manga IDs from public url
  useEffect(()=> {
    setMangaList([])
    fetch("https://api.mangadex.org/manga?limit=5&year=2022&includedTagsMode=AND&excludedTagsMode=OR&publicationDemographic%5B%5D=shounen&contentRating%5B%5D=safe&order%5BlatestUploadedChapter%5D=desc", {
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => response.json())
.then(({data}) => {
data.map((manga)=> {
  retierveMangaInfo(mangaList, setMangaList, manga.id, "mangaList")
})  
})
}, [])

useEffect(() => {
  fetch(`https://mangadex-project.herokuapp.com/mangaList`)
  .then(resp => resp.json())
  .then(data => setMangaListJson(data))
}, [mangaList, handleFollow])

  return (
    <div>
      <MangaContainer manga ={mangaListJson} 
      handleFollow={handleFollow}
      /> 
    </div>
  )
}

export default MangaList