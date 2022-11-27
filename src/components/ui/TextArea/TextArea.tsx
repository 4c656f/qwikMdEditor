import {
    component$,
    HTMLAttributes,
    Signal,
    useClientEffect$,
    useClientMount$,
    useSignal,
    useStylesScoped$
} from '@builder.io/qwik';
import styles from './textArea.scss?inline'
import {IColorIndex} from "../../../../types/IColorIndex";
import autosize from 'autosize';


const type = 'textarea'

type TextAreaProps = {
    colorIndex?: IColorIndex;
    onInput$?: (e:Event)=>void;
    ref?: Signal<HTMLTextAreaElement|undefined>;
    value?: Signal<string|undefined>;
}& Omit<HTMLAttributes<typeof type>, 'children'>

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

    useClientEffect$(({track})=>{
        track(()=>value?.value)
        console.log(value?.value, 'textArea')
    })


    return (

        <textarea

            ref={ref}
            // value={value?.value}

            class={classes.join(' ')}
            oninput$={async (e)=>{
                if(onInput$)onInput$(e)
            }}
            {...rest}
        >{value?.value}</textarea>

    );
});
