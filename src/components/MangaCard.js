import React from 'react'

function MangaCard({manga}) {


  
  return (
    <div className="card mb-3 bg-dark"  style={{maxWidth: "1000px"}}>
      <div className="row g-0">
        <div className="col-md-4">
          <img className='img-fluid rounded-start' src={manga.coverArt} alt={manga.title}></img>
        </div>
        <div className='col-md-8'>
          <div className="card-body">
            <strong>Title:<h5 className="card-title mangaUser text-warning">{manga.title}</h5></strong>
            <strong>Author: <p className="text-warning mangaUser"> {manga.author}</p></strong>
            <strong>Artist: <p className="text-warning mangaUser">{manga.artist}</p></strong>
            <strong>Description: <p className="card-text mangaUser text-warning">{manga.description ? manga.description : "No Description"}</p></strong>
            <a title="Go to manga Page" target="_blank" rel="noopener noreferrer" href={manga.url} >Go to manga Page</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MangaCard

