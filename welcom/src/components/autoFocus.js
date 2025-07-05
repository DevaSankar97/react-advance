import { useRef, useState } from "react";

function AutoFocus() {
  const [cred,setCred] = useState({
    userName:'',
    passWord:''
  })
  const ref = useRef(null);
  const handleInput = (e)=>{
    setCred(pre=>{
      return {...pre,[e.target.name]:e.target.value}
    })
  }
  const handleSubmit = ()=>{
    console.log(cred);
    setCred({
      userName:'',
      passWord:''
    });
    ref.current.focus()
    // console.log(ref);
  }
  return (
    <>
      {/* <h1>I'm a react welcome app</h1> */}
      <div className="d-flex justify-content-center align-items-center">
        <div className="card">
          <div className="card-body">
            <h5 className="text-center mb-3">Login</h5>
            <form>
              <input className="form-control mb-3" ref={ref} placeholder="Enter username" type="text" name="userName" autoFocus value={cred.userName} onChange={(e)=>{handleInput(e)}}/>
              <input className="form-control mb-3" placeholder="Enter password" type="password" name="passWord" value={cred.passWord} onChange={(e)=>{handleInput(e)}}/>
              <div className="text-end">
                <button type="button" onClick={(e)=>{handleSubmit(e)}} className="btn btn-sm btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}

export default AutoFocus;
