import esbuild from 'esbuild'
import {sassPlugin} from 'esbuild-sass-plugin';

await esbuild.build({
    entryPoints: ['src/main.js'],
    bundle: true,
    outfile: 'templates/assets/dist/main.js',
    assetNames: '[name]',
    plugins: [
        sassPlugin(),
    ],
    loader: {
        '.woff': 'file',
        '.woff2': 'file',
        '.ttf': 'file',
    },
    format: 'esm',
    target: 'es2020',
    minify: true,
    sourcemap: false

})

await esbuild.build({
    entryPoints: ['src/libs/pjax.js'],
    bundle: true,
    outfile: 'templates/assets/dist/libs/pjax.js',
    format: 'esm',
    target: 'es2020',
    minify: true,
    sourcemap: false
});