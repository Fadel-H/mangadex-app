import React from 'react'
import MangaCard from './MangaCard'

function MangaContainer({manga, handleFollow}) {
  return (
    <div>
      {manga.map(data => {
      return  <MangaCard key={data.id} manga={data} handleFollow={handleFollow} />
      })}
    </div>
  )
}

export default MangaContainer

