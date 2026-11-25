import { useState } from 'react'

export default function JoinForm ({ onJoin }) {
  const [name, setName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    const trimmed = name.trim()

    if (trimmed) onJoin(trimmed)
  }

  return (
    <div className='join'>
      <form onSubmit={handleSubmit} className='join-form'>
        <h1>Join the chat</h1>
        <input
          autoFocus
          maxLength={20}
          placeholder='Insert a Username!'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type='submit' disabled={!name.trim()}>
          Join
        </button>
      </form>
    </div>
  )
}
