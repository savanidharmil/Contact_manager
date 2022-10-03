import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ContactService from '../../../server/ContactService';

function AddContacts(props) {

  const navigate = useNavigate();
  const [state, setState] = useState({
    loading : false,
    contact:{
      name : "",
      photo : "",
      mobile : "",
      email : "",
      company : "",
      address : ""
    }    
  });
  
  const [formErrors,setFromErrors] = useState({});

  const UpdateInput = ((e) => {
    setState({
      ...state,
      contact:{
        ...state.contact,
        [e.target.name]:e.target.value
      }
    })
  });

  

const submitForm = async (e)=>{
  e.preventDefault();

  const errors={}
  // console.log(values);
  const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const regexMobile = /^[1-9]\d*$/;
  if(!state.contact.name){
    errors.name="Name is required.";
  }

  if(!state.contact.email){
    errors.email="Email is required";
  } else if(!regex.test(state.contact.email)){
    errors.email="Please enter valid Email format.";
  }

  if(!state.contact.photo){
    errors.photo="Photo URL is required.";
  }

  if(!state.contact.mobile){
    errors.mobile="Mobile is required.";
  } else if(!regexMobile.test(state.contact.mobile)){
    errors.mobile="Mobile Number is not valid.";
  }
  if(!state.contact.company){
    errors.company="Company is required.";
  }
  if(!state.contact.address){
    errors.address="Address is required.";
  }
  setFromErrors(errors);
  if(Object.keys(errors).length==0){
    console.log("no errors");
    try{
      let response = await ContactService.createContact(state.contact);
      console.log(response);
      if(response){
        window.location.reload();
      }
    }catch(error){
      setState({...state, formErrors:error.message});
      console.log("add error");
        navigate('/contacts/add', {replace:false});
    }
  }

 
}

const {loading, contact} = state;


  return (
    <>
      <section className='add-contact p-2'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <form>
                <div className=''>
                  <input type="text" className='form-control' placeholder='Name' name="name" required={true} value={contact.name} onChange={UpdateInput} />
                </div>
                <p className="form_error" >{formErrors.name}</p>
                <div className=''>
                  <input type="text" className='form-control' placeholder='Photo URL' name="photo" required={true} value={contact.photo} onChange={UpdateInput} />
                </div>
                <p className="form_error" >{formErrors.photo}</p>
                <div className=''>
                  <input type="text" className='form-control' placeholder='Mobile' name="mobile" required={true} value={contact.number} onChange={UpdateInput} />
                </div>
                <p className="form_error" >{formErrors.mobile}</p>
                <div className=''>
                  <input type="text" className='form-control' placeholder='Email' name="email" required={true} value={contact.email} onChange={UpdateInput} />
                </div>
                <p className="form_error" >{formErrors.email}</p>
                <div className=''>
                  <input type="text" className='form-control' placeholder='Company Name' name="company" required={true} value={contact.company} onChange={UpdateInput} />
                </div>
                <p className="form_error" >{formErrors.company}</p>
                <div className=''>
                <textarea className="form-control" placeholder="Address" name="address" required={true} onChange={UpdateInput} value={contact.address}>{contact.address}</textarea>
                </div>
                <p className="form_error" >{formErrors.address}</p>
                <div className='mb-2'>
                  <button type="button" className='btn btn-success' onClick={submitForm} >Create</button> 
                  <button type="button" className="btn btn-dark ms-2" onClick={props.handleClose}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default AddContacts
