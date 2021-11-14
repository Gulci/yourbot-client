import {animated, useSpring} from 'react-spring'

import {useState} from 'react'

export default function FlavorText() {
  const flavorTexts = [
    'live',
    'awesome',
    'sus',
    'shitposting',
    'funny',
    'yours',
  ]

  const [flavorTextsIndex, setFlavorTextsIndex] = useState(0)
  const [isReversed, setIsReversed] = useState(true)
  const {index} = useSpring({
    config: {
      clamp: true,
      damping: 1.2,
      frequency: 1.5,
      precision: 0.5,
    },
    delay: 1000,
    from: {index: 0},
    index: flavorTexts[flavorTextsIndex].length,
    onRest: () => {
      if (isReversed) {
        setFlavorTextsIndex(
          flavorTextsIndex + 1 < flavorTexts.length ? flavorTextsIndex + 1 : 0,
        )
      }
      setIsReversed(!isReversed)
    },
    reset: true,
    reverse: isReversed,
  })

  return (
    <animated.span>
      {index.to((n) => flavorTexts[flavorTextsIndex].slice(0, Math.trunc(n)))}
    </animated.span>
  )
}
