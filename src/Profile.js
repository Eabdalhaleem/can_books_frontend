

import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';

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
                    </>

                }
                
            </div>
        )
    }
}

export default withAuth0(Profile);

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;

