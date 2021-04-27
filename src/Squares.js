import React, {useState} from 'react';
import './styles/SquareStyles.css'
import {getRandomSquareNumber} from './utilities'



export const timerFunction = (setTime, setSquare, squareParam, setNumbers, setText, playSound) => {
  
    let start = Date.now(); // remember start time
    let timer = setInterval(function() {
    let timePassed = Date.now() - start;
      setSquare([
        {
            backgroundColor: 'black',
            shapeBackground: 'black',
            color: 'white'
            
          },
          {
            backgroundColor: 'black',
            shapeBackground: 'black',
            color: 'white'
          },
          {
            backgroundColor: 'black',
            shapeBackground: 'black',
            color: 'white'
          },
          {
            backgroundColor: 'black',
            shapeBackground: 'black',
            color: 'white'
          }
        ])
   
  
    if (timePassed >= 2500) {
      
        setCorrectFont()
        setSquare(squareParam)
        setNumbers(getRandomSquareNumber())
        clearInterval(timer);
        setText(true)
        // playSound()

      return;
    }
    setTime(0)
    draw(timePassed);
  }, 20); 
 
}



function draw(timePassed) {
  document.getElementsByClassName('number')[0].style.fontSize = (180 -(timePassed/9) )+ 'px';
  document.getElementsByClassName('number')[1].style.fontSize = (180 -(timePassed/9) )+ 'px';
  document.getElementsByClassName('number')[2].style.fontSize = (180 -(timePassed/9) )+ 'px';
  document.getElementsByClassName('number')[3].style.fontSize = (180 -(timePassed/9) )+ 'px';
}

 export function setCorrectFont() {
  document.getElementsByClassName('number')[0].style.fontSize = '2em';
  document.getElementsByClassName('number')[1].style.fontSize = '2em';
  document.getElementsByClassName('number')[2].style.fontSize = '2em';
  document.getElementsByClassName('number')[3].style.fontSize = '2em';
}


export function Squares(props) {

    return (
        <div style={props.backgroundStyle} className='background'>
            <div className='square' style={{backgroundColor: props.shapeColor}}>
                <div className='number'>
                    {props.number}
                </div>
            </div>
        </div>
    )
}




