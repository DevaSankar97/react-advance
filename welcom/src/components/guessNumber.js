import { useState } from "react";

const targetNumber = Math.floor(Math.random() * 10) +1;
function GuessNumber(){
    const [result,setResult] = useState('');
    const handleInput = (e)=>{
        if(e.target.value === targetNumber){
            setResult('Correct, Great !')
        }else if(e.target.value > targetNumber){
            setResult('Higher')
        }else if(e.target.value < targetNumber){
            setResult('Lower')
        }else{
            setResult('Invalid Input')
        }
    }
    return (<>
        <div className="d-flex justify-content-center align-items-center ">
            <div className="card shadow border-0 w-50">
                <div className="card-body">
                    <h5 className="mb-3">Guess a number between 1 to 10 ({targetNumber})</h5>
                    <input name="number" type="text" className="form-control my-3" onChange={handleInput}/>
                    {result && <h5> Guessed Number is {result}</h5>}
                </div>
            </div>
        </div>
    </>)
}

export default GuessNumber;