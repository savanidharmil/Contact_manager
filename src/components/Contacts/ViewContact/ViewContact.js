import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ContactService from '../../../server/ContactService';
import Spinner from '../../Spinner/Spinner';

function ViewContact() {
  // console.log(useParams());
  let {contactId} = useParams();
  let [state, setState] = useState({
    loading:false,
    contact:{},
    errorMassage : ''
  })

  const fetchData = async () => {
    const response = await ContactService.getContact(contactId);
        return response;
}

  useEffect(()=>{
    setState({...state, loading:true});
        fetchData()
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
  },[contactId])

  let {loading, contact, errorMassage} = state;

  return (
    <>
      <section className='view-content-intro p-2'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <p className='h3 text-warning'>View Content</p>
            </div>
          </div>
        </div>
      </section> 

      {
        loading ? <Spinner /> : <React.Fragment>
          {
            Object.keys(contact).length>0 && 
            <section className='view-contact mt-2' >
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-3'>
              <img src={contact.photo} alt="Profile" className='contact-img' />
            </div>
            <div className='col-md-8'>
              <ul className='list-group'>
                  <li className='list-group-item list-group-item-action'>
                      Name : <span className='fw-bold'>{contact.name}</span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                      Mobile : <span className='fw-bold'>{contact.mobile}</span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                      Email : <span className='fw-bold'>{contact.email}</span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                      Company Name : <span className='fw-bold'>{contact.company}</span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                      Address : <span className='fw-bold'>{contact.address}</span>
                  </li>
              </ul>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <Link to={'/contacts/list'} className="btn btn-warning" >Back</Link>
            </div>
          </div>
        </div>
      </section>
          }
        </React.Fragment>
      }
      
    </>
  )
}

export default ViewContact
