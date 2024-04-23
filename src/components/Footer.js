import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  
    const divFooter ={
        backgroundColor:'black',
        color:'white',
        alignitems:'center',
        textalign:'center',
        display:'flex',
        justifyContent:'center',
        
    }
    
  return (
    <div style={divFooter}>
        <h1 style={{textalign:'center'}}>Footer</h1>
    </div>
)
}

export default Footer;