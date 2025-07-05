import { useEffect, useState } from "react";

const targetNumber = Math.floor(Math.random() * 10) +1;
function GuessNumber(){
    const [result,setResult] = useState('');
    const [input,setInput] = useState('');
    const handleInput = (value)=>{
        const val = parseInt(value);
        if(val === targetNumber){
            setResult('Correct, Great !');
        }else if(val > targetNumber){
            setResult('Higher');
        }else if(val < targetNumber){
            setResult('Lower');
        }
    }
    useEffect(()=>{
        handleInput(input)
    },[input])
    return (<>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow border-0 w-50">
                <div className="card-body">
                    <h5 className="mb-3">Guess a number between 1 to 10</h5>
                    <input name="number" type="text" className="form-control my-3" onChange={(e)=>{setInput(e.target.value)}}/>
                    {result && <h5> Guessed Number is {result}</h5>}
                </div>
            </div>
        </div>
    </>)
}

export default GuessNumber;