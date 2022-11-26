import {component$, Slot, useStylesScoped$} from "@builder.io/qwik";
import styles from "./headerSectionElement.scss?inline";


export default component$(() => {


    useStylesScoped$(styles)

    return (
        <div
            class={'section_element'}
        >
            <Slot name={'title'}/>
            <div
                class={'elements_button'}
            >
                <Slot name={'buttons'}/>
            </div>
        </div>
    );
})