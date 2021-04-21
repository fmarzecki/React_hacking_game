import React, {useState} from 'react';
import './styles/SquareStyles.css'
import {getRandomSquareNumber} from './utilities'

export function Squares(props) {


    return (
        <div style={props.style} className='background'>
            <div id='number'>
                    {props.number}
            </div>
        </div>
    )
}




