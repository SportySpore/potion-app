import React from "react";

export const CustomerFormSection = ({ register, errors }) => {
    return (
        <div className="customerContainer">
            <div>
                <label>First name</label>
                <input type="text" name="firstName" ref={register({ required: true })}/>
                {errors.firstName && <p>Please enter a valid First Name</p>}
            </div>
            <div>
                <label>Last name</label>
                <input type="text" name="lastName" ref={register({ required: true })}/>
                {errors.lastName && <p>Please enter a valid Last Name</p>}
            </div>
            <div>
                <label>Email</label>
                <input type="text" name="email" ref={register({
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}/>
                {errors.email && <p>Please enter a valid Email Address</p>}
            </div>
            <div>
                <label>Phone</label>
                <input type="tel" name="phone" ref={register({ required: true, maxLength: 12, minLength: 8 })}/>
                {errors.phone && <p>Please enter a valid Phone Number</p>}
            </div>
        </div>
    );
}
