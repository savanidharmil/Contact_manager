import React, { useState,useEffect } from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import ContactService from '../../../server/ContactService';
import Spinner from '../../Spinner/Spinner';

function EditContact(props) {
  const contactId = props.contactId;
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
    },
    errorMessage:''
  });
  const [formErrors,setFromErrors] = useState({});

  const fetchUserData = async () => {
    const response = await ContactService.getContact(contactId);
        return response;
  }

  useEffect(()=>{
    setState({...state, loading:true});
        fetchUserData()
        .then((response) => {
            console.log(response.data);
            setState(
                {...state,
                loading:false,
                contact:response.data
            });
        })
        .catch((error) => {
            setState({
                ...state,
                loading:false,
                errorMassage:error.message
            })
        })
  },[contactId]);

  let UpdateInput = ((e) => {
    setState({
      ...state,
      contact:{
        ...state.contact,
        [e.target.name]:e.target.value
      }
    });
  });

  let UpdateContact = async (e)=>{
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
    try{
      let response = await ContactService.updateContact(state.contact, contactId);
      if(response){
        window.location.reload();
      }
    }catch(error){
      setState({...state, errorMessage:error.message});
    }
  }
  }

  let {loading, contact, errorMessage} = state;

  return (
    <>
    {/* <pre>{JSON.stringify(contact)}</pre> */}
    {
      loading ? <Spinner /> : <>
      <section className='add-contact p-2'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-12'>
              <img src={contact.photo} alt="Profile" className='contact-img' />
            </div>
            <div className='col-md-12 '>
              <form className=''>
                <div className='mb-2'>
                  <input type="text" className='form-control' placeholder='Name' required={true} name="name" value={contact.name} onChange={UpdateInput} />
                </div>
                <p className="form_error" >{formErrors.name}</p>
                <div className='mb-2'>
                  <input type="text" className='form-control' placeholder='Photo URL' required={true} name="photo" value={contact.photo} onChange={UpdateInput} />
                </div>
                <p className="form_error" >{formErrors.photo}</p>
                <div className='mb-2'>
                  <input type="text" className='form-control' placeholder='Mobile' required={true} name="mobile" value={contact.mobile} onChange={UpdateInput} />
                </div>
                <p className="form_error" >{formErrors.mobile}</p>
                <div className='mb-2'>
                  <input type="text" className='form-control' placeholder='Email' required={true} name="email" value={contact.email} onChange={UpdateInput} />
                </div>
                <p className="form_error" >{formErrors.email}</p>
                <div className='mb-2'>
                  <input type="text" className='form-control' placeholder='Company Name' required={true} name="company" value={contact.company} onChange={UpdateInput} />
                </div>
                <p className="form_error" >{formErrors.company}</p>
                <div className='mb-2'>
                  <input type="text" className='form-control' placeholder='Address' required={true} name="address" value={contact.address} onChange={UpdateInput} />
                </div>
                <p className="form_error" >{formErrors.address}</p>
                <div className='mb-2'>
                  <button type="button" className='btn btn-primary' onClick={UpdateContact} >Update</button> 
                  <button type="button" className="btn btn-dark ms-2" onClick={props.handleClose}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      </>
    }
      
    </>
  )
}

export default EditContact
