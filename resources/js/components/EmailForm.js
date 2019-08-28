import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {MDBBtn, MDBIcon } from 'mdbreact';

export default class EmailForm extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

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
                                    <label htmlFor='email-subject' className='grey-text'>Subject</label>
                                    <input type='text' id='email-subject'  className='form-control' value={this.state.value} onChange={this.handleChange} />
                                    <br />
                                    <label htmlFor='email-body' className='grey-text'>Body</label>
                                    <div id='email-body'></div>
                                    <div className='text-center mt-4'>
                                        <MDBBtn color='info' outline type='submit'>
                                            Send
                                            <MDBIcon far icon='paper-plane' className='ml-2' />
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

