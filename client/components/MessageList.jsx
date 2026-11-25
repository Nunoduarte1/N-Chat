import { useEffect } from 'react'
import { useRef } from 'react'

function formatTime (iso) {
  return new Date(iso).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function MessageList ({ messages, currentUser }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [messages])

  return (
    <div className='messages'>
      {messages.map(m =>
        m.type === 'system' ? (
          <div key={m.id} className='system-message'>
            {m.text}
          </div>
        ) : (
          <div
            key={m.id}
            className={`message ${m.username === currentUser ? 'mine' : ''}`}
          >
            <div className='meta'>
              <strong>{m.username}</strong>
              <span>{formatTime(m.timestamp)}</span>
            </div>
            <div className='text'>{m.text}</div>
          </div>
        )
      )}
      <div ref={bottomRef} />
    </div>
  )
}