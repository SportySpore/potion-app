import React from "react";

export const OrderFormSection = ({ register, setValue, errors }) => {
    return (
        <div className='section1-col2-wrap'>
            <div className='s1-card-1-2'>
                <label>Quantity</label>
                <input type="number" min="1" max="3" name="quantity" placeholder='max: 3' ref={register({ required: true, max: 3})}
                onChange={e => {
                    setValue('total', (e.target.value * 49.99).toFixed(2));
                }}/>
                {errors.quantity && <p>Order up to 3</p>}
            </div>

            <div className='s1-card-1-2'>
                <label>Total Cost</label>
                <input readOnly={true} type="number" name="total" placeholder={"0.00"} ref={register}/>
            </div>

        </div>
    );
}
