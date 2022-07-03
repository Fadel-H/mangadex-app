import React, {useState, useEffect } from 'react'

function UserManga({sessionToken}) {

useEffect(() => {
  fetch(`https://api.mangadex.org/user/follows/manga?limit=100`, {
  headers: {
    Accept: "application/json",
    "authorization" : sessionToken
  }
})
.then(response => response.json())
  .then(result => { console.log(result)})


}, [])
  return (
    <div>UserManga</div>
  )
}

export default UserManga