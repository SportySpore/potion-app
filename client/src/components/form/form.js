import React from "react";
import { useToasts } from 'react-toast-notifications'
import { postMagic }  from "../../services/ApiService";
import { useForm } from "react-hook-form";
import { CustomerFormSection } from "./customerFormSection";
import { AddressFormSection } from "./addressFormSection";
import { OrderFormSection } from "./orderFormSection";
import { CCFormSection } from "./ccFormSection";
import './form.css';

export const Form = () => {
    const { register, errors, handleSubmit, setValue } = useForm({mode: 'onBlur'});
    const { addToast } = useToasts();

    const onSubmit = async (data, e) => {
        console.log(data);
        const res = await postMagic(data);
        if (res.success) {
            addToast('Saved Successfully', { appearance: 'success' })
            e.target.reset();
        } else if (res.error) {
            res.error.forEach((err) => {
                addToast(err, { appearance: 'error' });
            });
        }
    };

    return (
        <div className='section-right'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <OrderFormSection register={register} setValue={setValue} errors={errors}/>
                <CustomerFormSection register={register} errors={errors}/>
                <AddressFormSection register={register} errors={errors}/>
                <CCFormSection register={register} errors={errors}/>
                <input type="Submit" value='ORDER'/>
            </form>
        </div>
    );
}


