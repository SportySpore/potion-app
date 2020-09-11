import React from "react";

export const AddressFormSection = ({ register, errors }) => {
    return (
        <div className='addressContainer'>
            <div className="span-3-1">
                <label>Address Line 1</label>
                <input type="text" name="street1" ref={register({ required: true })}/>
                {errors.street1 && <p>Please enter a valid Address</p>}
            </div>
            <div className="span-3-2">
                <label>Address Line 2</label>
                <input type="text" name="street2" ref={register}/>
            </div>
            <div>
                <label>State</label>
                <input type="text" name="state" ref={register({required: true})}/>
                {errors.state && <p>Please enter a valid State</p>}
            </div>
            <div>
                <label>City</label>
                <input type="text" name="city" ref={register({required: true})}/>
                {errors.city && <p>Please enter  a valid City</p>}
            </div>
            <div>
                <label>Zip Code</label>
                <input type="text" name="zip" ref={register({required: true})}/>
                {errors.zip && <p>Please enter a valid Zip Code</p>}
            </div>
        </div>
    );
}
