import React from "react";

export const AddressFormSection = ({ register, errors }) => {
    return (
        <div className='section-right-wrap'>
            <div className="form-input-1">
                <label>Address Line 1</label>
                <input type="text" name="address.street1" ref={register({ required: true })}/>
                {errors.address && errors.address.street1 && <p className='error'>Enter a valid Address</p>}
            </div>
            <div className="form-input-1">
                <label>Address Line 2</label>
                <input type="text" name="address.street2" ref={register}/>
            </div>
            <div className='form-input-1-3'>
                <label>State</label>
                <input type="text" name="address.state" ref={register({required: true})}/>
                {errors.address && errors.address.state && errors.address.state && <p className='error'>Enter a valid State</p>}
            </div>
            <div className='form-input-1-3'>
                <label>City</label>
                <input type="text" name="address.city" ref={register({required: true})}/>
                {errors.address && errors.address.city && <p className='error'>Enter a valid City</p>}
            </div>
            <div className='form-input-1-3'>
                <label>Zip Code</label>
                <input type="text" name="address.zip" placeholder={12345} maxLength={5} ref={register({required: true, pattern: "[0-9]{5}"})}/>
                {errors.address && errors.address.zip && <p className='error'>Enter a valid Zip Code</p>}
            </div>
        </div>
    );
}
