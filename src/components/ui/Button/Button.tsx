import {component$, HTMLAttributes, PropFunction, Slot, useStylesScoped$} from '@builder.io/qwik';

import styles from './button.scss?inline';
import {ButtonType} from "../../../../types/IElementType";
import {IElementsSize} from "../../../../types/IElementsSize";
import {IColorIndex} from "../../../../types/IColorIndex";


const type = 'button'

type ButtonProps = {
    onClick$?: PropFunction<() => void>;
    type?: ButtonType;
    size?: IElementsSize;
    colorIndex?: IColorIndex;
    className?: string;
} & Omit<HTMLAttributes<typeof type>, 'children'>


export default component$((props: ButtonProps) => {

    const {
        className,
        onClick$,
        type = 'contained',
        size = 'medium',
        colorIndex = '0',
        ...rest
    } = props


    useStylesScoped$(styles);

    const classes = [
        className ? className : '',
        'container',
        type,
        size,
        `color_${colorIndex}_index`,
    ]

    return (
        <button
            onClick$={async () => {
                if (onClick$) await onClick$();
            }}
            class={classes.join(' ')}
            {...rest}
        >
            <Slot/>
            <div
                class={'icon'}
            >
                <Slot
                    name={'icon'}
                />
            </div>
        </button>
    )
})