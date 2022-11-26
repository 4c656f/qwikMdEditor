import {component$, Slot, useStylesScoped$} from '@builder.io/qwik';
import styles from './header.scss?inline';
import {RequestHandler} from "@builder.io/qwik-city";
import type {Product} from "@prisma/client";


export const onGet: RequestHandler<Product[]> = async () => {

    console.log('layoutrequest')


};

export default component$(() => {


    useStylesScoped$(styles);

    return (
        <header
            class={'container'}
        >
            <section
                class={'section'}
            >
                <Slot name={'logoSection'}/>
            </section>
            <section
                class={'section'}
            >
                <Slot name={'mainSection'}/>
            </section>
            <section
                class={'section'}
            >
                <Slot name={'rightSection'}/>
            </section>

        </header>
    );
});
