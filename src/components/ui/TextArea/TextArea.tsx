import {component$, useClientEffect$, useClientMount$, useSignal, useStylesScoped$} from '@builder.io/qwik';
import styles from './textArea.scss?inline'
import {IColorIndex} from "../../../../types/IColorIndex";
import autosize from 'autosize';

type TextAreaProps = {
    colorIndex?: IColorIndex;
    onInput$?: (e:Event)=>void
}

export default component$((props: TextAreaProps) => {

    const {
        colorIndex = "1",
        onInput$
    } = props


    useStylesScoped$(styles)

    const classes = [
        'text_area',
        `color_${colorIndex}_index`
    ]

    const ref = useSignal<HTMLTextAreaElement>()
    const textValue = useSignal<string>('')
    const height = useSignal<number>(1)


    useClientEffect$(({track})=>{
        track(()=>textValue.value)
        if(ref.value){
            const heightTarget = ref.value.scrollHeight;
            const rowHeight = 15;
            const trows = Math.ceil(heightTarget / rowHeight) - 1;
            console.log(trows)
            if (trows) {

                height.value = trows;

            }
        }
    })
    return (

        <textarea

            ref={ref}
            rows={height.value}
            class={classes.join(' ')}
            oninput$={async (e)=>{
                if(onInput$)onInput$(e)
            }}
        />

    );
});
