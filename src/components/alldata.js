import { UserContext, Card } from './context.js';
import {useContext} from 'react';
import Navbar from './navbar.js';

function AllData(){
  const ctx = useContext(UserContext);
  return (

    <>
    <Navbar />
    {ctx.submissions.length>0 && (<h5 style={{textAlign:'center', paddingTop:40, fontFamily:"sans-serif"}}>Recent Activities</h5>)}
    <div>{ctx.submissions.map(s => {
      return (
      <div> 
        <Card 
          bgcolor="body-secondary"
          txtcolor='info-emphasis'
          header="Account Activity"
          body={
            (
            <div style={{fontFamily:'cursive'}}>
              <div><div className='text-info' style={{display:'inline'}}>Type:</div> <div style={{display:'inline'}} className='text-dark'>{s.type}</div></div><br/>
              <div><div className='text-info' style={{display:'inline'}}>Email:</div> <div style={{display:'inline'}} className='text-dark'>{s.user}</div></div><br/>
              <div><div className='text-info' style={{display:'inline'}}>Amount:</div> <div style={{display:'inline'}} className='text-dark'>{s.amt}</div></div><br/>
            </div>
          )
          }
          />
      </div>
      )
    })}</div>
    </>
  );
}

export default AllData;
