import {UserContext, Card} from '../components/context.js';
import {useState, useContext} from 'react';
import Navbar from './navbar.js';

function CreateAccount(){
  const [show, setShow]         = useState(true);
  const [status, setStatus]     = useState('');
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const ctx = useContext(UserContext);  

  function validate(field, label){
     function spaces(){
      let text = field.split('');
      let s = 0
      let c = 0
      for(let i=0; i<text.length; i++){
        if(text[i].charCodeAt(0)===32) {
          s += 1;
        }
        else{
          c += 1;
        }
      }
      if ((s===text.length)|| (s>=c)){
        return true;
      }
      else{
        return false;
      }
      
     }
     
     if(spaces()){
          setStatus(`${label} must be valid characters.`);
          setTimeout(() => setStatus(''), 3000);
          return false
     }
      if(label==='Password'){
        if(password.split('').length<8){
          setStatus('Password must be at least 8 characters.');
          setTimeout(() => setStatus(''), 3000);
          return false
        }
      }
     else{
      if (!field) {
        setStatus(`Please verify ${label} field.`);
        setTimeout(() => setStatus(''), 3000);
        return false;}
        
      
      }
      
      
      return true;
  }

  function handleCreate(){
    console.log(name, email, password);
    if (!validate(name,     'Name'))     return;
    if (!validate(email,    'Email'))    return;
    if (!validate(password, 'Password')) return;
    ctx.users.push({name, email, password, balance:1000});
    ctx.submissions.push({type:'Account creation', user: email, amt:1000});
    setShow(false);
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <>
    <Navbar />
    <Card
      bgcolor="primary-subtle"
      txtcolor='info-emphasis'
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-dark" onClick={handleCreate} disabled={(name === '')&&(email === '')&&(password === '')}>Create Account</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-dark" onClick={clearForm}>Add another account</button>
              </>
            )}
    />
    </>
  )
}

export default CreateAccount;