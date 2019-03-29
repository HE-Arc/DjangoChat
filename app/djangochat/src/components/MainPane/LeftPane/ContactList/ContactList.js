import React, { Component } from 'react';
import {connect} from 'react-redux';

import Server from './Contact/Server';
import Friend from './Contact/Friend';
import './ContactList.css';

import {requestChannelList} from "../../../../actions/ChannelAction";
import {requestServerList, selectServer} from "../../../../actions/ServerAction";
import {requestFriendList, selectFriend} from "../../../../actions/FriendAction";
import {showFriends, showServers} from "../../../../actions/ContactAction";

class ContactList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            serverDisplayed: true,
        }

        this.props.requestFriendList();
        this.props.requestServerList();
        window.addEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        this.forceUpdate();
    }

    displayFriends = () => {
        this.setState({
            serverDisplayed: false
        })
        this.props.showFriends();
    }

    displayServers = () => {
        this.setState({
            serverDisplayed: true
        })
        this.props.showServers();
    }

    friendSelected = (id) => {
        this.props.selectFriend(id);
    }

    serverSelected = (id) => {
        this.props.selectServer(id);
        this.props.requestChannelList(id);
    }

    render() {
        // Update the displayed list
        const white = '#FFFFFF';
        const blue = '#0D6CB8';
        let contactRows = [];
        const classesSelected = ["row", "contact", "selected"];
        const classesSelectable = ["row", "contact", "selectable"];

        const [styleServers, styleFriends] = this.state.serverDisplayed ? [blue, white] : [white, blue];
        if (this.state.serverDisplayed) {
            contactRows = this.props.servers.map((server)=>{
                let classes = (server.id === this.props.activeServerId) ? classesSelected : classesSelectable;
                return( <div key={server.id} className={classes.join(' ')}>
                            <Server contact={{}} server={server} serverSelected={this.serverSelected}/>
                        </div>);
            });
        } else {
            contactRows = this.props.friends.map((friend)=>{
                console.log(friend);
                let classes = (friend.id === this.props.activeFriendId) ? classesSelected : classesSelectable;
                return( <div key={friend.id + this.props.servers.length} className={classes.join(' ')}>
                            <Friend friend={friend} friendSelected={this.friendSelected}/>
                        </div>);
            });
        }

        let selectorServersDescription = "S";
        let selectorfriendsDescription = "F";
        if (window.innerWidth > 767) {
            selectorServersDescription = "Servers";
            selectorfriendsDescription = "Friends";
        }

        // Return the component
        return (
            <div style={{paddingTop: '10px', height: '100%', width: '100%'}}>
                <div className="contactSelector unselectable">
                    <div id="selectorServers" className="cursor" onClick={this.displayServers} style={{color: styleServers}}>
                        {selectorServersDescription}
                    </div>
                    <div id="selectorSeparator">/</div>
                    <div id="selectorFriends" className="cursor" onClick={this.displayFriends} style={{color: styleFriends}}>
                        {selectorfriendsDescription}
                    </div>
                </div>
                <div id="contactList" className="container scrollable unselectable">
                    {contactRows}
                </div>
            </div>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        servers: state.server.servers,
        activeServerId: state.server.activeServerId,
        friends: state.friend.friends,
        activeFriendId: state.friend.activeFriendId,
    }
}

const mapDispatchToProps= {
    requestServerList,
    requestFriendList,
    requestChannelList,
    selectServer,
    selectFriend,
    showFriends,
    showServers
}

export default connect(mapsStateToProps, mapDispatchToProps)(ContactList); 
