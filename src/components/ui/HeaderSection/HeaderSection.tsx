import styles from './HeaderSection.scss?inline'
import {component$, Slot, useStylesScoped$} from "@builder.io/qwik";


export default component$(() => {


    useStylesScoped$(styles)

    return (
        <menu
            class={'container'}
        >
            <div
                className={'main_title'}
            >
                <Slot name={'title'}/>
            </div>

            <div
                className={'elements_container'}
            >
                <Slot/>
            </div>
        </menu>
    );
})

