import Navbar from './navbar.js';
import { Card } from './context.js';
function Login(){
  return (
   <>
    <Navbar />
    <Card
      bgcolor="primary-subtle"
      txtcolor='info-emphasis'
      header="Login"
  
      body={ (  
              <>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" /><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" /><br/>
              <button type="submit" className="btn btn-dark">Create Account</button>
              </>
            )}
    />
    </>
    
    
  )  
}

export default Login;
