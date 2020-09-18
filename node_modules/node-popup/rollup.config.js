import babel from 'rollup-plugin-babel';
const input = 'src/index.ts';
const plugins = [
    babel({
        exclude: 'node_modules/**',
        extensions: ['.ts']
    })
];

export default [{
    file: 'dist/cjs.js'
}, {
    file: 'dist/esm.mjs',
    format: 'esm'
}].map(({file, format='cjs'})=>({
        input,
        plugins,
        output: {file, format}
}));
