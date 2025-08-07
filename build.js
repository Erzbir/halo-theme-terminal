import esbuild from 'esbuild'
import {sassPlugin} from 'esbuild-sass-plugin';
import {readdirSync} from 'fs';
import {join} from 'path';

async function build_main() {
    const srcfile = 'src/main.js';
    const outfile = 'templates/assets/dist/main.js';

    await esbuild.build({
        entryPoints: [srcfile],
        bundle: true,
        outfile: outfile,
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
}


async function build_libs() {
    const srcDir = 'src/libs';
    const outDir = 'templates/assets/dist/libs';

    await esbuild.build({
        entryPoints: readdirSync(srcDir)
            .filter(file => file.endsWith('.js'))
            .map(file => join(srcDir, file)),
        bundle: true,
        outdir: outDir,
        format: 'esm',
        target: 'es2020',
        minify: true,
        splitting: false,
        sourcemap: false
    });
}

await build_main();
await build_libs();