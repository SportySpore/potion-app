import React from "react";

export const CCFormSection = ({ register, errors }) => {
    return (
        <div className="ccContainer">
            <div>
                <label>Credit Card Number</label>
                <input type="text" name="ccNum" ref={register({ required: true })}/>
                {errors.ccNum && <p>Please enter a valid Credit Card Number</p>}
            </div>

            <div>
                <label>Expiration Date</label>
                <input type="text"
                       name="exp"
                       placeholder="mm/yy"
                       maxLength="5"
                       ref={register({required: true})}
                       onKeyUp={e => {
                           const value = e.target.value;
                           if (value.match(/^\d{2}$/) !== null) {
                               e.target.value = value + "/";
                           }
                           if (value.length > e.target.maxLength) {
                               e.target.value = e.target.value.slice(0, e.target.maxLength)
                           }
                       }}
                />
                {errors.exp && <p>Please enter a valid Expiration Date</p>}
            </div>
        </div>
    );
}
