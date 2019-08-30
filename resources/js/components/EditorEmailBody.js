import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';

class EditorEmailBody extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: '',
            hasText: false,
            editorState: EditorState.createEmpty()
        };
        
        this.onChange = this.onChange.bind(this);

        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.onUnderlineClick = this.onUnderlineClick.bind(this);
        this.onBoldClick = this.onBoldClick.bind(this);
        this.onItalicClick = this.onItalicClick.bind(this);
       
    }

    onChange(editorState) {
        let value = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        let hasText = this.state.editorState.getCurrentContent().hasText();
        this.setState({
            value,
            hasText,
            editorState
        });
    }

    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
    }
    
    onUnderlineClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
        event.preventDefault();
    }
    
    onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
        event.preventDefault();
    }
    
    onItalicClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
        event.preventDefault();
    }

    render() {
        return (
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
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange} 
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default EditorEmailBody;