import Navbar from './navbar.js';
import { Card, UserContext } from './context.js';
import {useContext, useState} from 'react';

function Withdraw(){


  const ctx = useContext(UserContext);
  const [user, setUser] = useState('');
  const [amt, setAmt] = useState(0);
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(0)
  const [er, setEr] = useState('');
  const [overDraft, setOverDraft] = useState(false);
  
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
      let i = ctx.users.findIndex(e => e.email === user)
      ctx.users[i].balance -= Number(amt);
      ctx.submissions.push({type:'Money Withdrawal', user:user, amt:amt});
      setBalance(prev => prev + Number(amt));
      if(ctx.users[i].balance < 0){
        setOverDraft(true);
      }
      setTimeout(() => {
        alert('Withdrawal successful')
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
      header="Withdraw"
      body={(
      <>
        {
          showBalance  && (
          <>
           <div style={{fontFamily:'cursive', fontSize:'large'}}>Balance: {ctx.users[ctx.users.findIndex(e => e.email === user)].balance} {(overDraft || ctx.users[ctx.users.findIndex(e => e.email === user)].balance<0 ) && (<div className='text-danger' style={{fontWeight:'bold'}}>Overdrawn Account !!</div>)} </div> 
            <br/>
           <div style={{fontFamily:'cursive', fontSize:'large'}}>Withdrawn: {Number(balance)}</div> 
          </>
          )
        }
        <label htmlFor="accounts" style={{padding:10, fontSize:'large', fontWeight:'bold'}} className='text-info'>Account</label>

        <select id="accounts" style={{margin:5, borderRadius:'5px'}} onChange={(e) => {
          setUser(e.currentTarget.value);
          setShowBalance(true) ;
          setBalance(0)}}>

        <option value="default" disabled hidden selected>Select User</option>
  
        {ctx.users.map(e => {
        return <option value={e.email}>{e.name}</option>
        })}

        </select>

    <label htmlFor="num" style={{padding:10, fontSize:'large', fontWeight:'bold'}} className='text-info'>Enter Amount</label>

    <input style={{width:100, margin:5, borderRadius:'5px'}} id='num' type='number' min={0} value={amt} 
      onChange={(e) => { setAmt(e.currentTarget.value) }} placeholder='0.00' required/>

      <br/>
          <button type="submit" className="btn btn-dark" onClick={handleSubmit} disabled={(Number(amt) === 0) ||  (user === '')} style={{ margin:10}}>Withdraw</button>
          <div className='text-warning'>{er}</div>
      </>
      )}/>

      
    </>
   
  )
}

export default Withdraw;
