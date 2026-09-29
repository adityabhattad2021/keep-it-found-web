import { useEffect, useRef } from 'react'

import { filmOnYouTube, sitePath } from '../site-config'

type FilmDialogProps = Readonly<{ open: boolean; onClose: () => void }>

/** The two-minute launch film, recorded in Found, in a native dialog. */
export function FilmDialog({ open, onClose }: FilmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const video = videoRef.current
    if (!dialog || !video) return
    if (open && !dialog.open) {
      dialog.showModal()
      void video.play().catch(() => undefined)
    } else if (!open && dialog.open) {
      video.pause()
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      aria-label="The Found launch film"
      className="film-dialog"
      ref={dialogRef}
      onCancel={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <div className="film-dialog__bar">
        <a className="film-dialog__elsewhere" href={filmOnYouTube} rel="noreferrer" target="_blank">Watch on YouTube</a>
        <button className="film-dialog__close" type="button" onClick={onClose} aria-label="Close the film">Close</button>
      </div>
      <div className="film-dialog__frame">
        <video
          ref={videoRef}
          aria-label="The Found launch film. Its subtitles are part of the picture."
          controls
          playsInline
          poster={sitePath('media/found-film.jpg')}
          preload="none"
          src={sitePath('media/found-film.mp4')}
        >
          <track kind="captions" label="English" src={sitePath('media/found-film.vtt')} srcLang="en" />
        </video>
      </div>
    </dialog>
  )
}
