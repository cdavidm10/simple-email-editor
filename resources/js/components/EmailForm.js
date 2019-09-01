import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {MDBBtn  } from 'mdbreact';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';

export default class EmailForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            title: 'New Email',
            buttonSubmit: 'Create',
            id: null,
            subject: '',
            body: ''
        };

        this.validator = new SimpleReactValidator({autoForceUpdate: this});
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBackClick = this.goBackClick.bind(this);

        this.onChangeEditor = this.onChangeEditor.bind(this);
        this.handleKeyCommandEditor = this.handleKeyCommandEditor.bind(this);
        this.onUnderlineClick = this.onUnderlineClick.bind(this);
        this.onBoldClick = this.onBoldClick.bind(this);
        this.onItalicClick = this.onItalicClick.bind(this);
    }

    componentDidMount () {
        
        this.id = this.props.match.params.id;

        if (this.id) {
    
          this.setState({
            title: 'Edit Email',
            buttonSubmit: 'Update',
            id: this.id
          })

          var self = this;
          axios.post('/get', {id: this.id})
            .then(function(response) {
                self.setState({
                    subject: response.data.subject,
                    body: response.data.body,
                    editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.body)))
                })
            });
        }
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

    onChangeEditor(editorState) {
        let body = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        let hasText = this.state.editorState.getCurrentContent().hasText();

        body = hasText ? body : ''; 
        this.setState({body,editorState});
    }

    handleKeyCommandEditor(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
          this.onChangeEditor(newState);
          return 'handled';
        }
        return 'not-handled';
    }
    
    onUnderlineClick() {
        this.onChangeEditor(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
        event.preventDefault();
    }
    
    onBoldClick() {
        this.onChangeEditor(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
        event.preventDefault();
    }
    
    onItalicClick() {
        this.onChangeEditor(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
        event.preventDefault();
    }

    handleSubmit(event) {
        event.preventDefault();

        function _handleSuccess() {
            window.location.href = '/'; 
        }

        function _handleError(error, self) {
            self.setState({
                errors: error.response.data.errors
            });
        }

        function _sendRequest(self) {
            let email = {
                id: self.state.id,
                subject: self.state.subject,
                body: self.state.body
            };

            return axios.post('/store', email);
        }

        if (this.validator.allValid()) {
            var self = this;
            _sendRequest(self)
                .then(_handleSuccess)
                .catch(function(error) {
                    _handleError(error, self)
                });
        } else {
            this.validator.showMessages();
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <p className='h4 text-center mb-'>{this.state.title}</p>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={this.handleSubmit}>
                                    <div className='form-group'>
                                        <label htmlFor='subject' className='grey-text'>Subject</label>
                                        <input type='text' id='subject' className='form-control' value={this.state.subject} onChange={this.handleChange}/>
                                        {this.validator.message('subject', this.state.subject, 'required|max:100')}
                                    </div>
                                    <br/>
                                    <div className='form-group'>
                                        <label htmlFor='body' className='grey-text'>Body</label>
                                        <input type="hidden" id="body" value={this.state.body}/> 
                                        <div className="editorContainer">
                                        <div className="editors">
                                            <div className="editors-btns">
                                                <button onClick={this.onUnderlineClick}>U</button>
                                                <button onClick={this.onBoldClick}><b>B</b></button>
                                                <button onClick={this.onItalicClick}><em>I</em></button>
                                            </div>
                                            <div className="editors-editor">
                                                <Editor
                                                    editorState={this.state.editorState}
                                                    handleKeyCommand={this.handleKeyCommandEditor}
                                                    onChange={this.onChangeEditor} 
                                                />
                                            </div>
                                        </div>
                                        {this.validator.message('body', this.state.body, 'required')}
                                    </div>
                                        <div className='text-right mt-4'>
                                            <MDBBtn color='info' outline onClick={this.goBackClick}>
                                                Go Back
                                            </MDBBtn>
                                            <MDBBtn color='success' outline type='submit'>
                                                {this.state.buttonSubmit}
                                            </MDBBtn>
                                        </div>
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