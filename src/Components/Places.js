import React from 'react';

function Places({ heading,title, place, choosePlace}) {
  
    
   
  return (
    <main className='Place-Container'>
     <div className='place'>
     <h2>{heading}</h2>
   {place.length===0?<p>{title}</p>:""}
     </div>
     <ul className='image-container' >
        {
            place.map((item)=>{
                return(
                    <li className='image-title' onClick={()=>choosePlace(item.id)}>
                        <img src={item.image.src} alt={item.image.alt} />
                        <p>{item.title}</p>
                    </li>
                )
            })
        }

     </ul>
    


    </main>
  )
}

export default Places