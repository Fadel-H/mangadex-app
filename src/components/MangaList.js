import React, {useState, useEffect} from 'react'
import MangaContainer from "./MangaContainer"

function MangaList() {
  const [mangaList,setMangaList]= useState([])

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

function retierveMangaInfo(id){
  fetch(`https://api.mangadex.org/manga/${id}?includes[]=author&includes[]=artist&includes[]=cover_art`)
.then(resp => resp.json())
.then(({data}) => { 
  let mangaData = {author: [], artist:[]}
  for (let element of data.relationships){
    if (element.type === "author"){
      mangaData.author.push(element.attributes.name)
    } else if (element.type === "artist"){
      mangaData.artist.push(element.attributes.name)
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
    }}  


  })
}

  return (
    <div>
      <MangaContainer manga = {mangaList}/> 
    </div>
  )
}

export default MangaList



