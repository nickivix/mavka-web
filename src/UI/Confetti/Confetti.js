import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default () => {
    const { width, height } = useWindowSize()
    return (
        <div>
            <Confetti
                numberOfPieces={100}
                recycle={false}
                wind={0.29}
                gravity={-0.1}
                confettiSource={{x:0, y:height, w: 0, h:0}}
                initialVelocityX={10}
                tweenDuration={1}
            />
            <Confetti
                numberOfPieces={100}
                recycle={false}
                wind={-0.29}
                gravity={-0.1}
                initialVelocityX={10}
                confettiSource={{x:width, y:height, w: 0, h:0}}
                tweenDuration={2}
            />
        </div>
    )
}
