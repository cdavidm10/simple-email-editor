import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {MDBBtn  } from 'mdbreact';
import axios from 'axios'
import EditorEmailBody from './EditorEmailBody'; // Import a component from another file

export default class EmailForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            body: '',
            errors: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.showError = this.showError.bind(this);
        // this.hasErrorFor = this.hasErrorFor.bind(this);
        this.goBackClick = this.goBackClick.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    goBackClick(event) {
        event.preventDefault();
        window.location.href = '/'; 
    }

    handleSubmit(event) {
        event.preventDefault();
        // if(validateForm(this.state.errors)) {
        //     console.info('Valid Form')
        // }else{
        //     console.error('Invalid Form')
        // }

        let email = {
            subject: this.state.subject,
            body: 'Esta es una prueba desde REACT'
        }
        console.log(email);
        axios.post('/store', email).then(response => {
            // redirect to the emails listing main page
            console.log(response);
            window.location.href = '/'; 
        }).catch(error => {
            console.log(error);
            this.setState({
              errors: error.response.data.errors
            })
        })
    }

    // hasErrorFor(field) {
    //     return !!this.state.errors[field]
    // }

    // showError(field) {
    //     if (this.hasErrorFor(field)) {
    //         return (
    //         <span className='invalid-feedback'>
    //             <strong>{this.state.errors[field][0]}</strong>
    //         </span>
    //         )
    //     }
    // }

    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <p className='h4 text-center mb-'>New Email</p>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={this.handleSubmit}>
                                    <label htmlFor='subject' className='grey-text'>Subject</label>
                                    <input type='text' id='subject'  className='form-control' value={this.state.subject} onChange={this.handleChange} />
                                    <br/>
                                    {/* {this.showError('subject')} */}
                                    <label htmlFor='body' className='grey-text'>Body</label>
                                    <EditorEmailBody id='body'/>
                                    <div className='text-right mt-4'>
                                        <MDBBtn color='info' outline onClick={this.goBackClick}>
                                            Go Back
                                        </MDBBtn>
                                        <MDBBtn color='success' outline type='submit'>
                                            Send
                                        </MDBBtn>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <EmailForm />, 
    document.getElementById('new-email-form')
);

