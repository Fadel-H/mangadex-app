import React, {useState, useEffect} from 'react'
import MangaCard from './MangaCard'

function MangaContainer({manga}) {
  return (
    <div>
      {manga.map(data => {
      return  <MangaCard key={data.id} manga={data} />
      })}
    </div>
  )
}

export default MangaContainer

