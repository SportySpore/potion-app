import React from "react";
import { useToasts } from 'react-toast-notifications'
import { postMagic }  from "../services/ApiService";
import { useForm } from "react-hook-form";
import { CustomerFormSection } from "./customerFormSection";
import { AddressFormSection } from "./addressFormSection";
import { OrderFormSection } from "./orderFormSection";
import { CCFormSection } from "./ccFormSection";

export const Form = () => {
    const { register, errors, reset, handleSubmit, setValue } = useForm({mode: 'onBlur'});
    const { addToast } = useToasts();

    const onSubmit = async (data, e) => {
        const order = getRequestBody(data);
        const res = await postMagic(order);
        if (res.success) {
            addToast('Saved Successfully', { appearance: 'success' })
            e.target.reset();
        } else {
            addToast(res.error.toLocaleString(), { appearance: 'error' })
        }
    };

    const getRequestBody = (data) => {
        return {
            "firstName": data.firstName,
            "lastName": data.lastName,
            "email": data.email,
            "address": {
                "street1": data.street1,
                "street2": data.street2,
                "state": data.state,
                "zip": data.zip,
                "city": data.city
            },
            "phone": data.phone,
            "payment": {
                "ccNum": data.ccNum,
                "exp": data.exp
            },
            "quantity": data.quantity,
            "total": data.total
        }
    }

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


