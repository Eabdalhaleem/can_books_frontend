import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import BestBooks from './BestBooks';

export class Profile extends Component {
    render() {
        return (
            <div className="userInfo-section">
                {
                    this.props.auth0.isAuthenticated&&
                    <>
                    <h1 className="username-title">{this.props.auth0.user.name}</h1>
                    <img className="user-img" src={this.props.auth0.user.picture} alt={this.props.auth0.user.name}/>
                    <p className="user-email">{this.props.auth0.user.email}</p>
                    <BestBooks/>
                    </>

                }
                
            </div>
        )
    }
}

export default withAuth0(Profile);
