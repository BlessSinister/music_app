import { useState } from 'react'
import trackList from '../assets/trackList.js'
import Track from '../components/Track'
import style from './mainPage.module.scss'
import { Input } from '@mui/material'

const runSearch = (query) => {
  if (!query) {
    return trackList
  }
  const lowerCaseQuery = query.toLowerCase()
  return trackList.filter(
    (item) =>
      item.title.toLocaleLowerCase().includes(lowerCaseQuery) ||
      item.artists.toLocaleLowerCase().includes(lowerCaseQuery)
  )
}

export default function MainPage() {
  const [state, setState] = useState(trackList)
  const handleChange = (e) => {
    const foundTracks = runSearch(e.target.value)
    setState(foundTracks)
  }

  return (
    <div className={style.search}>
      <Input
        className={style.input}
        placeholder="Поиск треков"
        onChange={handleChange}
      />
      <div className={style.list}>
        {state.map((track, i) => (
          <Track key={i} track={track} />
        ))}
      </div>
    </div>
  )
}
