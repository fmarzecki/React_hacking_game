import React, {useState, useEffect} from 'react';
import './styles/AnswerForm.css'

export function AnswerForm(props) {

    const {checkIfCorrect} = props;

    const [answer, setAnswer] = useState('');
    const handleChange = ({target}) => {
        setAnswer(target.value);
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

      
    const handleButton = ()=> {
      props.handleAgainButton();
      setAnswer('')    
      document.getElementById('answer').value = ''; 
    }

    return (
    <div>
        <input disabled={props.disabled} id='answer' onChange={handleChange} autocomplete='off' placeholder='Blue Square'  type='text'></input>
        <button disabled={!(props.disabled)} onClick={handleButton} className='btn_again' type='submit'> Again </button>
    </div>    
    )
}

