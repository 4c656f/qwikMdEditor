import {component$, useClientEffect$, useContext, useSignal, useStyles$, useStylesScoped$} from '@builder.io/qwik';
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
    'java'
}


export const remark = new Remarkable({
    highlight(str: string, lang: string): string {
        return hljs.highlight(str, {language: lang in languages?lang:'js'}, true).value
    }
})

export default component$(() => {


    const globalStore = useContext(globalContext)

    useStylesScoped$(styles)
    useStyles$(codeStyles)


    const textAreaValue = useSignal('')

    const textAreaValueHtml = useSignal('')


    useClientEffect$(({track}) => {
        track(() => textAreaValue.value)
        const html = remark.render(textAreaValue.value)
        console.log(html)
        textAreaValueHtml.value = html
    })


    return (
        <div
            class={'container'}
        >
            <div
                class={'editor_container'}
            >
                <TextArea
                    onInput$={(e) => {
                        const target = e.target as HTMLTextAreaElement
                        textAreaValue.value = target.value
                    }}
                    colorIndex={'0'}
                />


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
