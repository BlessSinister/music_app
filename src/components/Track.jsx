/* eslint-disable react/prop-types */
import style from './track.module.scss'
import { IconButton } from '@mui/material'

import { PlayArrow, Pause } from '@mui/icons-material'
import secondsToMMSS from '../utils/secondsToMMSS'
import { AudioContext } from '../context/AudioContext'
import { useContext } from 'react'
import cn from 'classnames'

export default function Track({ track }) {
  const { handleToggleAudio, currentTrack, isPlaying } =
    useContext(AudioContext)
  const formatDuration = secondsToMMSS(track.duration)
  const iscurrentTrack = currentTrack.id === track.id
  return (
    <div className={cn(style.track, iscurrentTrack && style.playing)}>
      <IconButton onClick={() => handleToggleAudio(track)}>
        {iscurrentTrack && isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img src={track.preview} alt="" className={style.preview} />
      <div className={style.credits}>
        <b>{track.title}</b>
        <p>{track.artists}</p>
      </div>
      <p>{formatDuration}</p>
    </div>
  )
}
