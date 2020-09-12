import React from "react";
import { useToasts } from 'react-toast-notifications'
import { postMagic }  from "../services/ApiService";
import { useForm } from "react-hook-form";
import { CustomerFormSection } from "./customerFormSection";
import { AddressFormSection } from "./addressFormSection";
import { OrderFormSection } from "./orderFormSection";
import { CCFormSection } from "./ccFormSection";

export const Form = () => {
    const { register, errors, handleSubmit, setValue } = useForm({mode: 'onBlur'});
    const { addToast } = useToasts();

    const onSubmit = async (data, e) => {
        console.log(data);
        const res = await postMagic(data);
        //const res = {success: false, error: ["Here's an Error!", "Another One!"]};
        if (res.success) {
            addToast('Saved Successfully', { appearance: 'success' })
            e.target.reset();
        } else {
            res.error.forEach((err) => {
                addToast(err, { appearance: 'error' });
            });
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mega">Order Form</h2>
            <OrderFormSection register={register} setValue={setValue} errors={errors}/>
            <CustomerFormSection register={register} errors={errors}/>
            <AddressFormSection register={register} errors={errors}/>
            <CCFormSection register={register} errors={errors}/>
            <input type="Submit" />
        </form>
    );
}


