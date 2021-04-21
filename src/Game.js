import React, {useEffect, useState} from 'react'
import './styles/Game.css'
import {Squares} from './Squares'
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {Button, InputGroup, FormControl} from 'react-bootstrap'
import {AnswerForm} from './AnswerForm'

const getRandomColor = ()=> {
    const colors = ['green', 'blue', 'purple', 'black', 'yellow'];
    
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    return colors[randomColorIndex];
  }

const getRandomSquareNumber = () => {
    return Math.floor(Math.random() * 4) ;
}


export function Game(props) {

    const [squareNumber, setSquareNumber] = useState(getRandomSquareNumber())

    const [squares, setSquares] = useState([
        {
          backgroundColor: getRandomColor()
        },
        {
          backgroundColor: getRandomColor()
        },
        {
          backgroundColor: getRandomColor()
        },
        {
          backgroundColor: getRandomColor()
        }
      ])

    const randomNewSquares = () => {
        setSquares([
            {
                backgroundColor: getRandomColor()
              },
              {
                backgroundColor: getRandomColor()
              },
              {
                backgroundColor: getRandomColor()
              },
              {
                backgroundColor: getRandomColor()
              }
            ])
            setSquareNumber(getRandomSquareNumber())
            
    }
    
    const [correctAnswer, setCorrectAnswer] = useState(squares[squareNumber].backgroundColor);
    useEffect(()=> {
        setCorrectAnswer(squares[squareNumber].backgroundColor)
        return ()=> {

        } 
    })

    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);

    const checkIfCorrect = (text) => {
        
        if(correctAnswer===text) {
            setStreak(prev=> prev+1);
            randomNewSquares()
            setTime(0)
        }
        else{
                setStreak(0);
                setTime(timeLimit)
                setLose(true)
        }
        if (streak > maxStreak) {
            setMaxStreak(streak);
        }
    }

    const [lose, setLose] = useState(false)

    const [timeLimit, setTimeLimit] = useState(4)
    const [timer, setTime] = useState(0);

    useEffect(()=> {
        if (timer < timeLimit) {
            const intervalId = setInterval(()=>setTime(prev=>prev+0.1), 100);
            
      return() => {
          clearInterval(intervalId);
      }
        } else {
            setLose(true)
        }
  },[timer])

    const handleAgainButton = () => {
        randomNewSquares();
        setLose(false)
        setTime(0)

    }

    return (
    <div id='main'>
        <div className='Streak'>
                STREAK: {streak} | MAX STREAK: {maxStreak} 
            </div>
        <div className='GameScreen'>
            <label for="volume">Speed:</label>
            <div id="setRange">
            <input type="range" id="volume" name="volume" 
                min="0" max="12" value={timeLimit} autocomplete='off' onChange={(e)=>setTimeLimit(e.target.value)}/> {timeLimit} 
            </div>
    
            <div className='Squares'>
                <Squares style={squares[0]}/>
                <Squares style={squares[1]}/>
                <Squares style={squares[2]}/>
                <Squares style={squares[3]}/>
            </div>

            <div className='progressBar'>
                <ProgressBar triped variant="reverse" now={(timer/timeLimit)*100} />
            </div>
            <div className='text'>
                ENTER THE BACKGROUND COLOR ({squareNumber+1})
            </div>
            <div>
                {lose ? <a id="loseText"> Correct Answer: </a> : ''}
                {lose ? correctAnswer : ''}
            </div>
            <div >
                <AnswerForm disabled={lose} handleAgainButton={handleAgainButton}checkIfCorrect={checkIfCorrect}/>
            </div>
        </div>
    </div>
    
    )

}
