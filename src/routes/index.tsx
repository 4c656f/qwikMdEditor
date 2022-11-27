import {$, component$, Signal, useClientEffect$, useSignal, useStyles$, useStylesScoped$} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import styles from '../components/styles/pages/index.scss?inline'
import codeStyles from '../components/styles/codeTheme.scss?inline'
import {Remarkable} from 'remarkable';
import hljs from 'highlight.js';
import TextArea from "../components/ui/TextArea/TextArea";


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


    // const globalStore = useContext(globalContext)

    useStylesScoped$(styles)
    useStyles$(codeStyles)


    const textAreaValue = useSignal('# title1 \n' +
        '## title2\n' +
        '### title3\n' +
        '#### title4\n' +
        '\n' +
        'some post content\n' +
        '\n' +
        '```ts\n' +
        'type IVariableType = {\n' +
        '   param: string\n' +
        '}\n' +
        'const variable: IVariableType = 10\n' +
        '```')
    const textAreaRef = useSignal<HTMLTextAreaElement>() as Signal<HTMLTextAreaElement>
    const dragRef = useSignal<HTMLDivElement>() as Signal<HTMLDivElement>

    const isUp = useSignal<boolean>(false)

    const textAreaValueHtml = useSignal('')





    const handleMouseMove = $((e: MouseEvent) => {
        e.preventDefault()
        textAreaRef.value.style.width = `${e.clientX}px`
    })
    const handleTouchMove = $((e: TouchEvent) => {

        console.log('touchEvent')
        textAreaRef.value.style.width = `${e.targetTouches[0].pageX}px`
    })


    //TEXT CHANGE
    useClientEffect$(({track}) => {
        track(() => textAreaValue.value)
        const html = remark.render(textAreaValue.value)
        textAreaValueHtml.value = html
    })


    //MOUSE EVENT START
    useClientEffect$(({track, cleanup}) => {
        track(() => isUp.value)
        cleanup(() => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('touchmove', handleTouchMove)
        })
        if (isUp.value) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('touchmove', handleTouchMove)
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
                        preventdefault:mousedown
                        class={'drag'}
                        document:onMouseUp$={() => {
                            isUp.value = false
                        }}
                        onMouseDown$={(e) => {
                            e.stopPropagation()
                            isUp.value = true
                        }}
                        onTouchStart$={()=>{
                            isUp.value = true
                        }}
                        onTouchEnd$={()=>{isUp.value = false}}
                        onTouchCancel$={()=>{isUp.value = false}}

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
