import React from "react";

export const CCFormSection = ({ register, errors }) => {
    return (
        <div className="ccContainer">
            <div>
                <label>Credit Card Number</label>
                <input type="text" name="payment.ccNum" ref={register({ required: true })}/>
                {errors.payment && errors.payment.ccNum && <p>Please enter a valid Credit Card Number</p>}
            </div>

            <div>
                <label>Expiration Date</label>
                <input type="text"
                       name="payment.exp"
                       placeholder="mm/yy"
                       maxLength="5"
                       ref={register({required: true, pattern: /(?:0[1-9]|1[0-2])\/[0-9]{2}/})}
                />
                {errors.payment && errors.payment.exp && <p>Please enter a valid Expiration Date</p>}
            </div>
        </div>
    );
}
