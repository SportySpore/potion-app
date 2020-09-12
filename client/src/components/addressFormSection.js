import React from "react";

export const AddressFormSection = ({ register, errors }) => {
    return (
        <div className='addressContainer'>
            <div className="span-3-1">
                <label>Address Line 1</label>
                <input type="text" name="address.street1" ref={register({ required: true })}/>
                {errors.address && errors.address.street1 && <p>Please enter a valid Address</p>}
            </div>
            <div className="span-3-2">
                <label>Address Line 2</label>
                <input type="text" name="address.street2" ref={register}/>
            </div>
            <div>
                <label>State</label>
                <input type="text" name="address.state" ref={register({required: true})}/>
                {errors.address && errors.address.state && errors.address.state && <p>Please enter a valid State</p>}
            </div>
            <div>
                <label>City</label>
                <input type="text" name="address.city" ref={register({required: true})}/>
                {errors.address && errors.address.city && <p>Please enter  a valid City</p>}
            </div>
            <div>
                <label>Zip Code</label>
                <input type="text" name="address.zip" placeholder={12345} maxLength={5} ref={register({required: true, pattern: "[0-9]{5}"})}/>
                {errors.address && errors.address.zip && <p>Please enter a valid Zip Code</p>}
            </div>
        </div>
    );
}
