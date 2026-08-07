import esbuild from "esbuild";
import {sassPlugin} from "esbuild-sass-plugin";
import {readdirSync, rmSync} from "node:fs";
import {join} from "node:path";

const OUTPUT_DIR = "templates/assets/dist";
const FONT_LOADERS = {
    ".woff": "file",
    ".woff2": "file",
    ".ttf": "file"
};
const COMMON_OPTIONS = {
    bundle: true,
    target: "es2020",
    minify: true,
    sourcemap: false
};

function buildMain() {
    return esbuild.build({
        ...COMMON_OPTIONS,
        entryPoints: ["src/main.js"],
        outfile: join(OUTPUT_DIR, "main.js"),
        assetNames: "[name]",
        plugins: [sassPlugin()],
        loader: FONT_LOADERS,
        format: "esm"
    });
}

function buildPixelStyles() {
    return esbuild.build({
        ...COMMON_OPTIONS,
        entryPoints: ["src/styles/pixel.scss"],
        outfile: join(OUTPUT_DIR, "pixel.css"),
        assetNames: "[name]",
        plugins: [sassPlugin()],
        loader: FONT_LOADERS
    });
}

function buildLibraries() {
    const sourceDirectory = "src/libs";

    return esbuild.build({
        ...COMMON_OPTIONS,
        entryPoints: readdirSync(sourceDirectory)
            .filter(file => file.endsWith(".js"))
            .map(file => join(sourceDirectory, file)),
        outdir: join(OUTPUT_DIR, "libs"),
        format: "esm",
        splitting: false
    });
}

rmSync(OUTPUT_DIR, {recursive: true, force: true});

await Promise.all([
    buildMain(),
    buildPixelStyles(),
    buildLibraries()
]);
