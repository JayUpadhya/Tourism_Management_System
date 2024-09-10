import React,{useState} from 'react';




const Accordion=({question,answer})=>{
    const [text,setText]=useState(false);

    const display=()=>{
       // alert("displayed")
       setText(!text);
    }
    return(
        <>
        <div className="question">
        <h2>{question}</h2>
        <p onClick={display}>{text ? '-' : '+'}</p>
      </div>
      <div className="answers">
        {text && <p>{answer}</p>}

      </div>
      
    
     
        </>
        
        
    )

}
export default Accordion;