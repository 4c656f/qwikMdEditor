import React from 'react';
import styles from './NestedLink.scss?inline'
import {component$, Slot, useStylesScoped$} from "@builder.io/qwik";

type NestedLinkCustomProps = {}
type NestedLinkProps = NestedLinkCustomProps

export default component$((props: NestedLinkProps) => {

    const {} = props

    useStylesScoped$(styles)
    return (
        <div
            className={'container'}
        >
            <Slot/>
        </div>
    );
})

