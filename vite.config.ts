import {defineConfig} from 'vite';
import {qwikVite} from '@builder.io/qwik/optimizer';
import {qwikCity} from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import prismPlugin from 'vite-plugin-prismjs'


export default defineConfig(() => {
    return {
        plugins: [qwikCity({
            mdxPlugins: {
                remarkGfm: true,
                rehypeSyntaxHighlight: true,
                rehypeAutolinkHeadings: false
            },
        }),
            qwikVite({
                optimizerOptions:{

                }}),
            tsconfigPaths(),
        ],
        preview: {
            headers: {
                'Cache-Control': 'public, max-age=600',
            },

        }




    };
});
