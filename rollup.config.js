import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-import-css';

export default {
    input: 'builds/cdn.js',
    output: [
        {
            name: 'AlpineRipple',
            file: 'dist/alpine-ripple.js',
            format: 'umd',
            sourcemap: true,
            compact: true,
            minifyInternalExports: true,
        }
    ],
    plugins: [
        nodeResolve(),
        filesize(),
        css({
            minify: true,
        }),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            node: 'current',
                        },
                    },
                ],
            ],
        }),
    ],
};
