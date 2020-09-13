import React from "react";

export const CustomerFormSection = ({ register, errors }) => {
    return (
        <div className='section1-col2-wrap'>
            <div className='s1-card-1-2'>
                <label>First name</label>
                <input type="text" name="firstName" ref={register({ required: true, pattern:"[a-zA-Z]*"})}/>
                {errors.firstName && <p>Enter a valid First Name</p>}
            </div>
            <div className='s1-card-1-2'>
                <label>Last name</label>
                <input type="text" name="lastName" ref={register({ required: true, pattern:"[a-zA-Z]*"})}/>
                {errors.lastName && <p>Enter a valid Last Name</p>}
            </div>
            <div className='s1-card-1-2'>
                <label>Email</label>
                <input type="text" name="email" ref={register({
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}/>
                {errors.email && <p>Enter a valid Email Address</p>}
            </div>
            <div className='s1-card-1-2'>
                <label>Phone Number</label>
                <input type="tel" name="phone" placeholder="123-456-7890" ref={register({required: true, pattern: /[0-9]{3}-[0-9]{3}-[0-9]{4}/ })}/>
                {errors.phone && <p>Enter a valid Phone Number</p>}
            </div>
        </div>
    );
}
