import { UserContext, Card } from './context.js';
import {useContext, useState} from 'react';
import Navbar from './navbar.js';

function Balance(){
  const ctx = useContext(UserContext)
  const [user, setUser] = useState('');
  const [showBalance, setShowBalance] = useState(false);
  return (
    <>
      <Navbar />
      <Card 
      bgcolor="light"
      txtcolor='dark'
      header="Account Balance"
      body={(
        <>

        {
          showBalance  && (
          <>
           <div style={{fontFamily:'cursive', fontSize:'larger'}}>Balance: {ctx.users[ctx.users.findIndex(e => e.email === user)].balance} 
           {(ctx.users[ctx.users.findIndex(e => e.email === user)].balance<0) && (<div className='text-danger' style={{fontWeight:'bold'}}>Overdrawn Account !!</div>)} </div> 
            <br/>
          </>
          )
        }
          <label for="accounts" style={{padding:10, fontSize:'large', fontWeight:'bold'}} className='text-info'>Account</label>

          <select id="accounts" style={{margin:5, borderRadius:'5px'}} onChange={(e) => {
            setUser(e.currentTarget.value);
            setShowBalance(true) }}>
          
            <option value="default" selected disabled hidden>Select User</option>
            
            {ctx.users.map(e => {
              return <option value={e.email}>{e.name}</option>
            })}
          
          </select>
          
        </>
      )} />
    </>
    
  )
}

export default Balance;
