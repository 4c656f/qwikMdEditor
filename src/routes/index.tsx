import {component$, useContext} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import Button from "../components/ui/Button/Button";
import {globalContext} from "./layout";


export default component$(() => {


    const globalStore = useContext(globalContext)


    return (
        <div>
            <h1>RootRoute</h1>
            <Button onClick$={() => {
                globalStore.isDark = !globalStore.isDark
            }}>
                <h3>Toggle</h3>
            </Button>
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
