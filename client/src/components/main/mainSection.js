import React from "react";
import { Title } from '../title/title';
import { Form } from '../form/form';
import './mainSection.css';

export const MainSection = () => {
    return (
        <section className='container section'>
            <div className='row'>
                <Title/>
                <Form/>
            </div>
        </section>
    );
}
