import React, { Component } from 'react';
import MainPane from '../components/MainPane/MainPane';

class ChatPage extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (<div>
            <MainPane/>
        </div>);
    }
}

export default ChatPage;