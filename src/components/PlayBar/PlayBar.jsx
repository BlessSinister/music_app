import { AudioContext } from '../../context/AudioContext'
import { useContext, useEffect, useState } from 'react'
import style from './playBar.module.scss'
import { Slider, IconButton } from '@mui/material'
import { Pause, PlayArrow } from '@mui/icons-material'
import secondsToMMSS from '../../utils/secondsToMMSS'

export default function PlayBar() {
  const [currentTimer, setCurrentTimer] = useState(0)
  const { audio, currentTrack, handleToggleAudio, isPlaying } =
    useContext(AudioContext)
  const { title, artists, preview, duration } = currentTrack
  const formattedDuration = secondsToMMSS(duration)

  const formattedCurrentTime = secondsToMMSS(currentTimer)

  const sliderCurrentTime = Math.round((currentTimer / duration) * 100)
  const handleChangeCurrentTime = (_, value) => {
    const time = Math.round((value / 250) * duration)
    setCurrentTimer(time)
    audio.currentTime = time
  }
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTimer(audio.currentTime)
    }, 1000)

    return () => {
      clearInterval(timeInterval)
    }
  }, [])
  return (
    <div className={style.playbar}>
      <img src={preview} alt="" className={style.preview} />
      <IconButton onClick={() => handleToggleAudio(currentTrack)}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <div className={style.credits}>
        <h4>{title}</h4>
        <p>{artists}</p>
      </div>
      <div className={style.slider}>
        <p>{formattedCurrentTime}</p>
        <Slider
          step={1}
          min={0}
          max={250}
          value={sliderCurrentTime}
          onChange={handleChangeCurrentTime}
        />
        <p>{formattedDuration}</p>
      </div>
    </div>
  )
}
