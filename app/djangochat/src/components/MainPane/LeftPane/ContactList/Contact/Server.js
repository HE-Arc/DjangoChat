import React, { Component } from 'react';
import './Server.css';

class Server extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            idServer: props.idServer,
            name: props.contact.name,
            connected: props.contact.connected,
            max: props.contact.max,
            serverSelected: props.serverSelected
        }
        this.select = this.select.bind(this);
    }

    select() {
        this.setState({
            selected: true
        })
        this.state.serverSelected(this.state.idServer);
    }

    render() {
        var connectivity = "";
        if (this.state.connected !== -1 && this.state.max !== -1)
        {
            connectivity = "(" + this.state.connected + "/" + this.state.max + ")";
        }

        return (
            <div id="containerServer" className="container" onClick={this.select}>
                <div className="row">
                    <div className="col-3">
                        <img alt="" src={require('./images/profile.png')} width="50" height="50"/>
                    </div>
                    <div className="col-6 textServer">
                        {this.state.name}
                    </div>
                    <div className="col-3 textServer">
                        {connectivity}
                    </div>
                </div>
            </div>
        );
    }
}

export default Server; 
