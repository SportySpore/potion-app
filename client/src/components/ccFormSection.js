import React from "react";

export const CCFormSection = ({ register, errors }) => {
    return (
        <div className='section1-col2-wrap'>
            <div className='s1-card-1-2'>
                <label>C.C Number</label>
                <input type="text" name="payment.ccNum" ref={register({ required: true })}/>
                {errors.payment && errors.payment.ccNum && <p>Enter a valid Credit Card Number</p>}
            </div>

            <div className='s1-card-1-2'>
                <label>Exp. Date</label>
                <input type="text"
                       name="payment.exp"
                       placeholder="mm/yy"
                       maxLength="5"
                       ref={register({required: true, pattern: /(?:0[1-9]|1[0-2])\/[0-9]{2}/})}
                />
                {errors.payment && errors.payment.exp && <p>Enter a valid Exp Date</p>}
            </div>
        </div>
    );
}
