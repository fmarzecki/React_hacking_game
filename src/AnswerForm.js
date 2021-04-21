import React, {useState, useEffect} from 'react';
import './styles/AnswerForm.css'

export function AnswerForm(props) {

    const {checkIfCorrect} = props;

    const [answer, setAnswer] = useState('');
    const handleChange = ({target}) => {
        setAnswer(target.value);
    }


    const handleSubmit = (event)=> {
        event.preventDefault();
        alert('fsdf')
    }

    
    useEffect(() => {
        const listener = event => {
          if(answer.length>0) {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            event.preventDefault();
            // callMyFunction();
            checkIfCorrect(answer)
            setAnswer('')    
            event.target.value = '';     
          }}
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      });


    return (
    <div>
        <input disabled={props.disabled} id='answer' onChange={handleChange} autocomplete='off' placeholder='Blue Square'  type='text'></input>
        <button  onClick={props.handleAgainButton} className='btn_again' type='submit'> Again </button>
    </div>    
    )
}

