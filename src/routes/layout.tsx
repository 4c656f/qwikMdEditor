import {component$, createContext, Slot, useClientEffect$, useContextProvider, useStore} from '@builder.io/qwik';
import Header from '../components/header/header';


type globalStore = {

    isDark: boolean;
}
export const globalContext = createContext<globalStore>('globalContext')

export default component$(() => {

    const globalStore = useStore<globalStore>({
        isDark: true
    })

    useContextProvider(globalContext, globalStore)


    useClientEffect$(({track}) => {
        track(() => globalStore.isDark)
        document.body.dataset.theme = globalStore.isDark ? 'dark' : 'light'
    })

    return (
        <>
            <main>
                <Header/>
                <section>
                    <Slot/>
                </section>
            </main>
            <footer>
                <a href="https://www.builder.io/" target="_blank">
                    Made with ♡ by Builder.io
                </a>
            </footer>
        </>
    );
});
