import {component$, Resource, useStyles$} from '@builder.io/qwik';
import codeTheme from '../../components/styles/codeTheme.scss?inline'
import {RequestHandler, useEndpoint} from "@builder.io/qwik-city";




export const Htmlstr = `
    <h1 id="title1">title1</h1>
    <h2 id="title2">title2</h2>
    <h3 id="title3">title3</h3>
    <h4 id="title4">title4</h4>
    <p>some post content</p>
    <pre><code><span class="token keyword">type</span> <span class="token class-name">IVariableType</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
        param<span class="token operator">:</span> <span class="token builtin">string</span></code></pre>`;



export const onGet: RequestHandler<string> = ()=>{
    return Htmlstr
}


export default component$(() => {

    // const {
    //
    // } = props

    useStyles$(codeTheme)
    const pageResource = useEndpoint<typeof onGet>()


    return (
        <div>
            <Resource
                value={pageResource}
                onPending={()=><div>Loading</div>}
                onResolved={(value)=>(
                    <div
                        dangerouslySetInnerHTML={value}
                    />
                )}
            />
        </div>
    );
});
