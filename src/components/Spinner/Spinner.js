import React from 'react'
import spinnerImage from '../../assets/images/Loading.gif';

let Spinner = () =>{
    return(
        <>
            <div>
                <img src={spinnerImage} alt="Spinner" className='d-block m-auto' style={{width:'200px'}} />
            </div>
        </>
    )
}

export default Spinner;