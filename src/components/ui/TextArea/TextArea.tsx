import {component$, HTMLAttributes, PropFunction, Signal, useClientEffect$, useStylesScoped$} from '@builder.io/qwik';
import styles from './textArea.scss?inline'
import {IColorIndex} from "../../../../types/IColorIndex";


const type = 'textarea'

type TextAreaProps = {
    colorIndex?: IColorIndex;
    onInput$?: PropFunction<(e: Event) => void>;
    ref?: Signal<HTMLTextAreaElement>;
    value?: Signal<string | undefined>;
} & Omit<HTMLAttributes<typeof type>, 'children'>

export default component$((props: TextAreaProps) => {

    const {
        colorIndex = "1",
        onInput$,
        value,
        ref,
        ...rest
    } = props


    useStylesScoped$(styles)

    const classes = [
        'text_area',
        `color_${colorIndex}_index`,

    ]

    useClientEffect$(({track}) => {
        track(() => value?.value)
        console.log(value?.value, 'textArea')
    })


    return (

        <textarea

            ref={ref}
            // value={value?.value}

            class={classes.join(' ')}
            oninput$={async (e) => {
                if(onInput$){
                    await onInput$(e)
                }
            }}
            {...rest}
        >{value?.value}</textarea>

    );
});
