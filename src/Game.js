import React, {useEffect, useState} from 'react'
import './styles/Game.css'
import {setCorrectFont, Squares, timerFunction} from './Squares'
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {Button, InputGroup, FormControl} from 'react-bootstrap'
import {AnswerForm} from './AnswerForm'
import {getRandomAnswerNumber, getRandomColor} from './utilities'
import {getRandomSquareNumber, getRandomProperty, propertieses} from './utilities'
import useSound from 'use-sound';
import clockTicking from './clock.mp3'



export function Game(props) {

  

  // const [play, { stop, isPlaying }] = useSound(clockTicking);


    const [squareNumber, setSquareNumber] = useState(getRandomSquareNumber())
    const [numbers, setNumbers] = useState(squareNumber)
    const [correctAnswerNumbers, setCorrectAnswerNumbers] = useState(getRandomAnswerNumber())
    
    const [squares, setSquares] = useState([
        {
          backgroundColor: getRandomColor(),
          color: getRandomColor()
        },
        {
          backgroundColor: getRandomColor(),
          color: getRandomColor()
        },
        {
          backgroundColor: getRandomColor(),
          color: getRandomColor()
        },
        {
          backgroundColor: getRandomColor(),
          color: getRandomColor()
        }
      ])

    // const getRealNumbersAnimation = ()=> {

    //   const timerFunction = () => {
    //     let start = Date.now(); // remember start time
    //     let timer = setInterval(function() {
    //     let timePassed = Date.now() - start;
      
    //     if (timePassed >= 4000) {
    //       clearInterval(timer); 
    //       return;
    //     }
    
    //     return (210 -(timePassed/5) )
    //   }, 20); 
    // }


    //   setSquares([ {
    //     backgroundColor: '',
    //     fontSize: timerFunction()
    //   },
    //   {
    //     backgroundColor: ''
    //   },
    //   {
    //     backgroundColor: ''
    //   },
    //   {
    //     backgroundColor: ''
    //   }])
    // }  

    // useEffect(()=>{
    //   getRealNumbersAnimation();
    // })

    const [correctAnswer, setCorrectAnswer] = useState(squares[correctAnswerNumbers[0]].backgroundColor +' ' + squares[correctAnswerNumbers[1]].color);

    useEffect(()=> {
      setCorrectAnswer(squares[correctAnswerNumbers[0]][properties[0]] +' '+ squares[correctAnswerNumbers[1]][properties[1]])
      
      return ()=> {
      } 
  })

    const randomNewSquares = () => {
      const getNumber = getRandomSquareNumber();
      setSquareNumber(getNumber)
      setNumbers(getNumber)
        setSquares([
            {
                backgroundColor: getRandomColor(),
                color: getRandomColor()
              },
              {
                backgroundColor: getRandomColor(),
                color: getRandomColor()
              },
              {
                backgroundColor: getRandomColor(),
                color: getRandomColor()
              },
              {
                backgroundColor: getRandomColor(),
                color: getRandomColor()
              }
            ])         
    }
    
    const [properties, setProperties] = useState([getRandomProperty(), getRandomProperty()])
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);

    useEffect(()=> {
      if (streak > maxStreak) {
        setMaxStreak(streak);
    }
    return () => {

    }})

    const checkIfCorrect = (text) => {
        if(correctAnswer===text) {
            setShowText(false)
            setStreak(prev=> prev+1);
            timerFunction(setTime, setSquares, squares, setNumbers, setShowText)
            setCorrectFont()
            setProperties([getRandomProperty(), getRandomProperty()])
            randomNewSquares()
            setCorrectAnswerNumbers(getRandomAnswerNumber())
            setTime(0)
            // stop()
        }
        else{
                setStreak(0);
                setTime(timeLimit)
                setLose(true)
                // stop()
        }
    }

    const [lose, setLose] = useState(false)
    const [timeLimit, setTimeLimit] = useState(8)
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

    useEffect(()=>{
      timerFunction(setTime, setSquares, squares, setNumbers, setShowText)
    },[])

    const [showText, setShowText] = useState(false)

    const handleAgainButton = () => {
        // setRandomNumbers(squareNumber.map(number=> number+1))
        timerFunction(setTime, setSquares, squares, setNumbers, setShowText )
        setShowText(false)
        setCorrectAnswerNumbers(getRandomAnswerNumber())
        randomNewSquares();
        setProperties([getRandomProperty(), getRandomProperty()])
        setLose(false)
        setTime(0)
        setStreak(0)

    }

    const text = (
      <div className='text'>
            ENTER {propertieses[properties[0]]} ({correctAnswerNumbers[0]+1}) AND {propertieses[properties[1]]} ({correctAnswerNumbers[1]+1})
      </div>
    )
    
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
            <div className='Squares' >
                <Squares number={numbers[0]+1} style={squares[squareNumber[0]]}/>
                <Squares number={numbers[1]+1} style={squares[squareNumber[1]]}/>
                <Squares number={numbers[2]+1} style={squares[squareNumber[2]]}/>
                <Squares number={numbers[3]+1} style={squares[squareNumber[3]]}/>
            </div>
            {showText ? text : ''}
            <div className='progressBar'>
                <ProgressBar id='bar' now={lose ? 100: (timer/timeLimit)*100} />
            </div>
            
            <div>
                {lose ? <a id="loseText"> Correct Answer: </a> : ''}
                {lose ? correctAnswer: ''}
                {lose ? <a id="loseText"> Real numbers: </a> : ''}
                {lose ? squareNumber.map(number=> number+1): ''}
            </div>
            <div >
                <AnswerForm disabled={lose} handleAgainButton={handleAgainButton} checkIfCorrect={checkIfCorrect}/>
            </div>
        </div>
    </div>
    
    )

}
