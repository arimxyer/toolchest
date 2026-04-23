import { useSpring, animated, config } from '@react-spring/web'
import { useState } from 'react'

/**
 * Minimal react-spring example.
 * Toggles a card between two states using physics-based spring animation.
 * Demonstrates: useSpring imperative API, animated.div, spring config preset.
 */
export function SpringCard() {
  const [flipped, setFlipped] = useState(false)

  const [springs, api] = useSpring(() => ({
    scale: 1,
    opacity: 1,
    y: 0,
    config: config.wobbly,
  }))

  const handleClick = () => {
    setFlipped(f => !f)
    api.start({
      scale:   flipped ? 1 : 1.12,
      opacity: flipped ? 1 : 0.85,
      y:       flipped ? 0 : -16,
    })
  }

  return (
    <animated.div
      onClick={handleClick}
      style={{
        ...springs,
        width: 200,
        height: 200,
        background: '#6c63ff',
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#fff',
        fontFamily: 'sans-serif',
        userSelect: 'none',
      }}
    >
      {flipped ? 'Release' : 'Press me'}
    </animated.div>
  )
}
