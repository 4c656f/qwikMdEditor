import {$, component$, Signal, useClientEffect$, useSignal, useStyles$, useStylesScoped$} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import styles from '../components/styles/pages/index.scss?inline'
import codeStyles from '../components/styles/codeTheme.scss?inline'
import TextArea from "../components/ui/TextArea/TextArea";
import PrismImp from 'prismjs';
import {marked} from 'marked'

export const Prism = PrismImp

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
        '```typescript\n' +
        'type IVariableType = {\n' +
        '   param: string\n' +
        '```' +
        '')

    const textAreaRef = useSignal<HTMLTextAreaElement>() as Signal<HTMLTextAreaElement>
    const dragContainerRef = useSignal<HTMLDivElement>() as Signal<HTMLDivElement>


    const isUp = useSignal<boolean>(false)

    const textAreaValueHtml = useSignal('')


    const handleMouseMove = $((e: MouseEvent) => {
        e.preventDefault()
        dragContainerRef.value.style.width = `${e.clientX}px`
    })

    const handleTouchMove = $((e: TouchEvent) => {
        console.log('touchEvent')
        dragContainerRef.value.style.width = `${e.targetTouches[0].pageX}px`
    })

    useClientEffect$(()=>{

            // @ts-ignore
            import('prismjs/components/prism-python')
            // @ts-ignore
            import('prismjs/components/prism-java')
            // @ts-ignore
            import('prismjs/components/prism-cpp')
            // @ts-ignore
            import('prismjs/components/prism-go')
            // @ts-ignore
            import('prismjs/components/prism-tsx')
            // @ts-ignore
            import('prismjs/components/prism-jsx')
            // @ts-ignore
            import('prismjs/components/prism-scss')
            // @ts-ignore
            import('prismjs/components/prism-typescript')
            // @ts-ignore
            import('prismjs/components/prism-typescript')

    })


    //TEXT CHANGE
    useClientEffect$(({track}) => {
        track(() => textAreaValue.value)
        const html = marked(textAreaValue.value, {
            highlight: (code, lang) => {
                if (Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                }
                // return Prism.highlight(code, Prism.languages[lang], lang);
                return Prism.highlight(code, Prism.languages.js, 'js');


            }
        })
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
    const handleKeyDown = $((e: KeyboardEvent) => {
        const target = e.target as HTMLTextAreaElement

        if (e.key === 'Tab') {
            e.preventDefault()
            const value = textAreaValue.value
            const start = target.selectionStart
            const end = target.selectionEnd;
            textAreaRef.value.setRangeText('   ', start, end, 'end')
            textAreaValue.value = value.substring(0, start) + '   ' + value.substring(end)
            // textAreaRef.value.selectionStart = textAreaRef.value.selectionEnd = start + 3
        }

    })

    useClientEffect$(() => {
        textAreaRef.value.addEventListener('keydown', handleKeyDown)
    })


    return (
        <div
            class={'container'}
        >
            <div
                class={'editor_container'}
            >
                <div
                    ref={dragContainerRef}
                    class={'editor_container_item'}
                >
                    <TextArea
                        value={textAreaValue}
                        ref={textAreaRef}

                        onInput$={(e) => {
                            const target = e.target as HTMLTextAreaElement
                            textAreaValue.value = target.value
                        }}

                        colorIndex={'0'}
                    />


                    <div

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
                        onTouchStart$={() => {
                            isUp.value = true
                        }}
                        onTouchEnd$={() => {
                            isUp.value = false
                        }}
                        onTouchCancel$={() => {
                            isUp.value = false
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
