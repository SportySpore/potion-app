import React from "react";

export const OrderFormSection = ({ register, setValue, errors }) => {
    return (
        <div className="orderContainer">
            <div>
                <label>Quantity</label>
                <input type="number" min="1" max="3" name="quantity" placeholder='Up to 3 orders' ref={register({ required: true, max: 3})}
                onChange={e => {
                    setValue('total', e.target.value * 49.99);
                }}/>
                {errors.quantity && <p>Please enter a Quantity between 1 - 3</p>}
            </div>

            <div>
                <label>Total</label>
                <input readOnly="true" type="number" name="total" step="0.01" ref={register}/>
            </div>

        </div>
    );
}
