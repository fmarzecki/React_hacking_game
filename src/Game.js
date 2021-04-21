import React, {useEffect, useState} from 'react'
import './styles/Game.css'
import {Squares} from './Squares'
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {Button, InputGroup, FormControl} from 'react-bootstrap'
import {AnswerForm} from './AnswerForm'
import {getRandomColor} from './utilities'
import {getRandomSquareNumber} from './utilities'




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

    const [correctAnswer, setCorrectAnswer] = useState(squares[squareNumber].backgroundColor);

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
    
    
    useEffect(()=> {
        setCorrectAnswer(squares[squareNumber].backgroundColor)
        return ()=> {
        } 
    })

    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    useEffect(()=> {
      if (streak > maxStreak) {
        setMaxStreak(streak);
    }
    return () => {

    }
    })

    const checkIfCorrect = (text) => {
  
        if(correctAnswer===text) {
            setStreak(prev=> prev+1);
            document.getElementById('bar').value='100'
            randomNewSquares()
            setTime(0)
            
          
        }
        else{
                setStreak(0);
                setTime(timeLimit)
                setLose(true)
        }
    }

    const [lose, setLose] = useState(false)

    const [timeLimit, setTimeLimit] = useState(6)
    const [timer, setTime] = useState(0);

    useEffect(()=> {
      if (timer < timeLimit) {
          const intervalId = setInterval(()=>setTime(prev=>prev+0.1), 100);
          
    return() => {
        clearInterval(intervalId);
    }
      } else {
          setLose(true)
          setStreak(0)

      }
})


// const lostFunction = ()=> {
//   setStreak(0)
//   setLose(true)
// }

const timerFunction = (seconds, functionName) => {
  let start = Date.now(); // remember start time
  let timer = setInterval(function() {
  let timePassed = Date.now() - start;

  if (timePassed/1000 >= seconds +0.100) {
    clearInterval(timer); 
    return;
  }

  functionName(timePassed/1000);
}, 150); 
}

    const handleAgainButton = () => {
        randomNewSquares();
        setLose(false)
        setTime(0)
        setStreak(0)
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
                min="1" max="12" value={timeLimit} autocomplete='off' disabled={!lose} onChange={(e)=>{setTimeLimit(e.target.value);}}/> {timeLimit} 
            </div>
    
            <div className='Squares'>
                <Squares style={squares[0]}/>
                <Squares style={squares[1]}/>
                <Squares style={squares[2]}/>
                <Squares style={squares[3]}/>
            </div>

            <div className='progressBar'>
                <ProgressBar id='bar' now={lose ? 100: (timer/timeLimit)*100} />
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