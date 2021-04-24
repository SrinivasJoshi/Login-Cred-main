import React, { useState } from "react";
import SearchMap from "./components/SearchMap";

function User(props) {
    const {
        handleLogout,
        toggleDiv,
        toggle,
        setNewPassword,
        resetPass,
    } = props;

    return (
        <section className="navbar">
            <nav>
                <h2>Welcome</h2>
                <div className="navitems">
                    <navbar-button onClick={toggleDiv}>
                        Change Password
                    </navbar-button>
                    <navbar-button onClick={handleLogout}>Logout</navbar-button>
                </div>
            </nav>
            <SearchMap />
            {toggle ? (
                <div className="newpass-div">
                    <h2>Change Password</h2>
                    <input
                        type="password"
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <navbar-button onClick={resetPass}>Confirm</navbar-button>
                </div>
            ) : (
                <p></p>
            )}
        </section>
    );
}

export default User;
