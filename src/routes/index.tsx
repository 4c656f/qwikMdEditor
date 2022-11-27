import {
    component$,
    QwikDragEvent,
    useClientEffect$,
    useContext,
    useSignal,
    useStyles$,
    useStylesScoped$,
    $, useClientMount$
} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import {globalContext} from "./layout";
import TextArea from "../components/ui/TextArea/TextArea";
import styles from '../components/styles/pages/index.scss?inline'
import codeStyles from '../components/styles/codeTheme.scss?inline'
import {Remarkable} from 'remarkable';
import hljs from 'highlight.js';


enum languages {
    'js',
    'python',
    'go',
    'php',
    'html',
    'css',
    'c++',
    'java',
    'ts'
}


export const remark = new Remarkable({
    highlight(str: string, lang: string): string {
        return hljs.highlight(str, {language: lang in languages ? lang : 'ts'}, true).value
    }
})

export default component$(() => {


    const globalStore = useContext(globalContext)

    useStylesScoped$(styles)
    useStyles$(codeStyles)


    const textAreaValue = useSignal('# title \n' +
        '## title\n' +
        '### title\n' +
        '#### title\n' +
        '\n' +
        'some post content\n' +
        '\n' +
        '```ts\n' +
        'type IVariableType = {\n' +
        '   param: string\n' +
        '}\n' +
        'const variable: IVariableType = 10\n' +
        '```')
    const textAreaRef = useSignal<HTMLTextAreaElement>()
    const dragRef = useSignal<HTMLDivElement>()

    const isUp = useSignal<boolean>(false)

    const textAreaValueHtml = useSignal('')


    const initialPos = useSignal<null|number>(null)
    const initialSize = useSignal<null|number>(null)




    const handleMouseMove = $((e:MouseEvent)=>{

        if(textAreaRef.value && e.clientX!==0){
            textAreaRef.value.style.width = `${e.clientX}px`
        }
    })
    //TEXT CHANGE
    useClientEffect$(({track}) => {
        track(() => textAreaValue.value)
        const html = remark.render(textAreaValue.value)
        textAreaValueHtml.value = html
    })
    //MOUSE EVENT START
    useClientEffect$(({track, cleanup})=>{
        track(()=>isUp.value)
        cleanup(()=>{
            document.removeEventListener('mousemove',handleMouseMove)
        })
        if(isUp.value){
            document.addEventListener('mousemove', handleMouseMove)
        }

    })



    return (
        <div
            class={'container'}
        >
            <div
                class={'editor_container'}
            >
                <div
                    class={'editor_container_item'}
                >
                    <TextArea
                        value={textAreaValue}
                        ref={textAreaRef}
                        onInput$={(e) => {
                            const target = e.target as HTMLTextAreaElement
                            textAreaValue.value = target.value
                        }}
                        id={'Resizable'}
                        colorIndex={'0'}
                    />
                    <div
                        ref={dragRef}
                        preventdefault:drag
                        class={'drag'}
                        document:onMouseUp$={(e)=>{
                            isUp.value = false
                        }}
                        onMouseDown$={(e)=>{
                            isUp.value = true
                        }}

                    />
                </div>


                {textAreaValueHtml.value &&
                    <div
                        class={'editor_container_item_md'}
                        dangerouslySetInnerHTML={textAreaValueHtml.value}
                    />
                }


            </div>

        </div>
    );
});

export const head: DocumentHead = {
    title: 'Welcome to Qwik',
    meta: [
        {
            name: 'description',
            content: 'Qwik site description',
        },
    ],
};
