import React, { useState } from "react";
import CustomMap from "./components/CustomMap";
import SearchMap from './components/SearchMap';

function User(props) {
    const {
        handleLogout,
        toggleDiv,
        toggle,
        setNewPassword,
        resetPass,
    } = props;

    return (
        <section className="hero">
            <nav>
                <h2>Welcome</h2>
                <div className="navitems">
                    <button onClick={toggleDiv}>Change Password</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            {/* <CustomMap /> */}
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
                    <button onClick={resetPass}>Confirm</button>
                </div>
            ) : (
                <p></p>
            )}
        </section>
    );
}

export default User;
