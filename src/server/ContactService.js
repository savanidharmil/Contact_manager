import axios from "axios";

export default class ContactService{
    static serverUrl = `http://localhost:9000`;

    static getAllContacts(){
        let dataURL = `${this.serverUrl}/contacts`;
        return axios.get(dataURL);
    }

    static getContact(contactId){
        let dataURL = `${this.serverUrl}/contacts/${contactId}`;
        return axios.get(dataURL);
    }

    static createContact(contact){
        let dataURL = `${this.serverUrl}/contacts`;
        return axios.post(dataURL,contact);
    }

    static updateContact(contact, contactId){
        let dataURL = `${this.serverUrl}/contacts/${contactId}`;
        return axios.put(dataURL,contact);
    }

    static deleteContact(contactId){
        let dataURL = `${this.serverUrl}/contacts/${contactId}`;
        return axios.delete(dataURL);
    }
}