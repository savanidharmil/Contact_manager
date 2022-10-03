
import React, { useEffect, useState } from 'react'
import ContactService from '../../../server/ContactService';
import Spinner from '../../Spinner/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AddContacts from '../AddContacts/AddContacts';
import EditContact from '../EditContact/EditContact';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const ContactList = () => {
    let [query , setQuery] = useState({
        text: ''
    })

    let [edtContactId , setEdtContactId] = useState(null)
    let [userDet , setUserDet] = useState({photo :"https://cdn-icons-png.flaticon.com/512/219/219983.png"})
    let [contactId,setContactId] = useState(null);

    let [state, setState] = useState({
        loading : false,
        contacts : [],
        filteredContacts :[],
        errorMassage : ''
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showUser, setShowUser] = useState(false);
    const handleUserClose = () => setShowUser(false);
    const handleUserShow = () => setShowUser(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const fetchData = async () => {
        const response = await ContactService.getAllContacts();
        return response;
    }

    const fetchUserData = async () => {
        const response = await ContactService.getContact(contactId);
        return response;
    }

    // for View user Details
    useEffect(()=>{
        if(contactId!==null){
            setState({...state, loading:true});
            fetchUserData()
            .then((response) => {
                console.log(response.data);
                setUserDet(response.data);
                setState({...state, loading:false});
            })
            .catch((error) => {
                console.log(error.massage);
            })
            if(isMobile){
                handleUserShow();
            }
        }   
      },[contactId])

    // for Get All Users Data
    useEffect( () => {
        setState({...state, loading:true});
        fetchData()
        .then((response) => {
            console.log(response.data);
            setState(
                {...state,
                loading:false,
                contacts:response.data,
                filteredContacts:response.data
            });
        })
        .catch((error) => {
            setState({
                ...state,
                loading:false,
                errorMassage:error.message
            })
        })
    }, []);


    //Delete Cotact
    let deleteContact = async (contactid) => {
        try{
            setState({...state, loading:true});
            let response = await ContactService.deleteContact(contactid);
            if(response){
                fetchData()
                .then((response) => {
                    console.log(response.data);
                    setState(
                        {...state,
                        loading:false,
                        contacts:response.data,
                        filteredContacts:response.data
                    });
                })
                .catch((error) => {
                    setState({
                        ...state,
                        loading:false,
                        errorMassage:error.message
                    })
                })
            }
        }catch(error){
            setState({
                ...state,
                loading:false,
                errorMassage:error.message
            })
        }

    }

    // Search Contacts
    let searchContacts = (e) => {
        setQuery({...query, text:e.target.value});
        let newFilteredContacts = state.contacts.filter(contact =>{
            return contact.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setState({
            ...state,
            filteredContacts:newFilteredContacts
        });
    }

    let {loading, contacts, filteredContacts, errorMassage } = state;
    // console.log(contacts.length);
  return (
    <>
        <section className='contact-search p-2'>
        {/* <pre>{contacts}</pre> */}
            <div className='container'>
                <div className='grid'>
                    <div className='row'>
                        <div className='col'>
                            <p className='h3'>Contact Manager
                                <button className='btn btn-primary ms-2' onClick={handleShow}>
                                    <i className='fa fa-plus-circle me-1'></i> Add Contact
                                </button>
                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 '>
                            <form className="row">
                                <div className='col'>
                                    <div className='mb-2'>
                                        <input type="text" className="form-comtrol search_field" placeholder="Seacrh Names" name="text" value={query.text} onChange={searchContacts} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        { loading ? <Spinner /> : <section className='contact-list'>
        <div className="container mt-3 mb-4">
            <div className='row'>
            <div className="col-lg-6 mt-lg-0">
                <div className="row">                    
                    {
                        filteredContacts.length > 0 && 
                        filteredContacts.map(contact => {
                            return( 
                                
                    <div className="col-md-12 col-sm-12 mt-2 " key={contact.id}>
                        <div className="user-dashboard-info-box table-responsive mb-0 bg-white shadow-sm">
                        <table className="table manage-candidates-top mb-0 align-items-center">
                            <tbody>
                            <tr className="candidates-list">
                                <td className="title">
                                <div className="thumb">
                                <img src={contact.photo} alt="Profile" className=' contact-img' />
                                </div>                  
                                </td>
                                <td className="candidate-list-favourite-time ">
                                <ul className='list-group'>
                                    <li className='list-group-item list-group-item-action'>
                                        Name : <span className='fw-bold'>{contact.name}</span>
                                    </li>
                                    <li className='list-group-item list-group-item-action'>
                                        Email : <span className='fw-bold'>{contact.email}</span>
                                    </li>
                                </ul>
                                </td>
                                <td>
                                <div className='d-flex flex-column align-items-center'>
                                <button className='btn btn-warning my-1' onClick={()=>{ setContactId(contact.id) }} > 
                                        <i className='fa fa-eye'></i>
                                    </button>
                                    <button onClick={()=>{ setEdtContactId(contact.id);handleShowEdit(); }} className='btn btn-primary my-1'> 
                                        <i className='fa fa-pen'></i>
                                    </button>
                                    {/* <button className='btn btn-danger my-1' onClick={()=>deleteContact(contact.id)}> 
                                        <i className='fa fa-trash'></i>
                                    </button> */}
                                </div>
                                </td>
                            </tr>              
                            </tbody>
                        </table>
                        
                        </div>
                    </div>
                       )
                        })
                    }
                </div>
            </div>

            {/* user Data View */}
            {/* Web view */}
            
            <div className="col-lg-6 mt-lg-0 " >
            <BrowserView>
                <Card style={{backgroundColor:'#e9ecef'}}>
                    <Card.Img variant="top contact-img-height mt-2" src={userDet.photo} alt="Contact " style={{width:'200px'}} />
                    <Card.Body >
                        <Card.Title className='text-center' >{userDet.name}</Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item style={{backgroundColor:'#e9ecef'}} >
                            <table className='person_data_table'>
                                <tr>
                                    <td className="width30">Full Name:</td>
                                    <td className="width70">{userDet.name}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{userDet.email}</td>
                                </tr>
                                <tr>
                                    <td>Phone:</td>
                                    <td>{userDet.mobile}</td>
                                </tr>
                                <tr>
                                    <td>Company:</td>
                                    <td>{userDet.company}</td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>{userDet.address}</td>
                                </tr>
                            </table>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                </BrowserView>
            </div>
             {/* Close Web view */}
            {/* Mobile view */}
            <MobileView>
                <Modal
                    show={showUser}
                    onHide={handleUserClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>View Contact Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card style={{backgroundColor:'#e9ecef'}}>
                            <Card.Img variant="top contact-img-height mt-2" src={userDet.photo} alt="Contact " style={{width:'150px'}} />
                            <Card.Body >
                                <Card.Title className='text-center' >{userDet.name}</Card.Title>
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item style={{backgroundColor:'#e9ecef'}} >
                                    <table className='person_data_table'>
                                        <tr>
                                            <td className="width30">Full Name:</td>
                                            <td className="width70">{userDet.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{userDet.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone:</td>
                                            <td>{userDet.mobile}</td>
                                        </tr>
                                        <tr>
                                            <td>Company:</td>
                                            <td>{userDet.company}</td>
                                        </tr>
                                        <tr>
                                            <td>Address:</td>
                                            <td>{userDet.address}</td>
                                        </tr>
                                    </table>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Modal.Body>
                    
                </Modal>
            </MobileView>
            {/* Close Mobile view */}
            {/* Close User data view */}

            </div>
        </div>


        {/* Model For Add new contact */}
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddContacts handleClose={handleClose}/>
        </Modal.Body>
        
      </Modal>
      {/* Close Model For Add new contact */}


      {/* Model For Edit contact */}
      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditContact handleClose={handleCloseEdit} contactId={edtContactId}/>
        </Modal.Body>
        
      </Modal>
      {/* Close Model For Edit contact */}
        </section> }
        
    </>
  )
}

export default ContactList
