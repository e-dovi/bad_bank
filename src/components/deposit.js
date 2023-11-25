import { UserContext, Card } from './context.js';
import {useContext, useState} from 'react';
import Navbar from './navbar.js';

function Deposit(){

  const ctx = useContext(UserContext)
  const [user, setUser] = useState('');
  const [amt, setAmt] = useState(0);
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(0)
  const [er, setEr] = useState('');

  const validate = (i) => {
    if (i<0){
      setEr('Amount cannot be negative.')
      setTimeout(()=>{
        setEr('')
      }, 4000)
      
    }
    else if (typeof(Number(i)) !== 'number'){
      setEr('Amount must be a number.')
      setTimeout(()=>{
        setEr('')
      }, 4000)
    }
    else{
      return true;
    }
  }

  const handleSubmit = () => {
    setEr('')
    if(validate(amt)){
      ctx.users[ctx.users.findIndex(e => e.email === user)].balance += Number(amt);
      ctx.submissions.push({type:'Money Deposit', user:user, amt:amt});
      setBalance(prev => prev + Number(amt));
      setTimeout(()=> {
        alert('Money deposited')
      }, 1000);
      setAmt(0);
    }
    
  }

  return (
  <>
    <Navbar />
    <Card 
      bgcolor="light"
      txtcolor='dark'
      header="Make a Deposit"
      body={(
        <>

        {
          showBalance  && (
          <>
           <div style={{fontFamily:'cursive', fontSize:'large'}}>Balance: {ctx.users[ctx.users.findIndex(e => e.email === user)].balance}</div> 
            <br/>
           <div style={{fontFamily:'cursive', fontSize:'large'}}>Added: {Number(balance)}</div> 
          </>
          )
        }
          <label for="accounts" style={{padding:10, fontSize:'large', fontWeight:'bold'}} className='text-info'>Account</label>

          <select id="accounts" style={{margin:5, borderRadius:'5px'}} onChange={(e) => {
            setUser(e.currentTarget.value);
            setShowBalance(true) ;
            setBalance(0)}}>
          
            <option value="default" selected disabled hidden>Select User</option>
            
            {ctx.users.map(e => {
              return <option value={e.email}>{e.name}</option>
            })}
          
          </select>

          <label for="num" style={{padding:10, fontSize:'large', fontWeight:'bold'}} className='text-info'>Enter Amount</label>

          <input style={{width:100, margin:5, borderRadius:'5px'}} id='num' type='number' min={0} value={amt} 
          onChange={(e) => { setAmt(e.currentTarget.value) }} placeholder='0.00' required/>
          
          <br/>
          <button type="submit" className="btn btn-dark" onClick={handleSubmit} disabled={(Number(amt) === 0) ||  (user === '')} style={{ margin:10}}>Deposit</button>
          <div className='text-warning'>{er}</div>
        </>
      )} />
    
  </>
    
  )
}

export default Deposit;