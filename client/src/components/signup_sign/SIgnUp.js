import React from "react";
import { NavLink } from "react-router-dom";

const SIgnUp = () => {
    return (
        <section>
                <div className="sign_container">
                    <div className="sign_header">
                        <img src="./blacklogoamazon.png" alt="" />
                    </div>
                    <div className="sign_form">
                        <form>
                            <h1>Sign Up</h1>
                            <div className="form_data">
                                <label htmlFor="fname">Your Name</label>
                                <input type="text" name="fname" id="fname" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="number">Email</label>
                                <input type="text" name="email" id="email" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="email">Contact Number</label>
                                <input type="text" name="mobile" id="mobile" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder=" Atleast 6 characters" id="password" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="password">Confirm Password</label>
                                <input type="password" name="password" id="password" />
                            </div>
                            <button className="signin_btn">Continue</button>

                            <div className="signin_info">
                                <p>Already have an account?</p>
                                <NavLink to='/login'>Sign In</NavLink>

                            </div>
                        </form>
                    </div>
                </div>
            </section>
    )
}

export default SIgnUp