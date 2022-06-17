const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig(webpack => {
    return {
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
                const mod = resource.request.replace(/^node:/, "");
                switch (mod) {
                    case "buffer":
                        resource.request = "buffer";
                        break;
                    case "stream":
                        resource.request = "readable-stream";
                        break;
                    default:
                        throw new Error(`Not found ${mod}`);
                }
            })
        ]
    }
}).js('resources/js/app.js', 'public/js').react().postCss('resources/css/app.css', 'public/css', []);
