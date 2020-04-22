const mix = require('laravel-mix')
const fs = require('fs-extra')
const glob = require('glob')
const multimatch = require('multimatch')
require('laravel-mix-polyfill')
require('laravel-mix-copy-watched')
require('laravel-mix-eslint')
require('laravel-mix-stylelint')
require('laravel-mix-imagemin')
require('laravel-mix-ejs')
const webpackPlugins = [];
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")


const basePath =
    (process.env.MIX_BASE_PATH || '')
    .replace(/\/$/, '')

const srcPath =
    (process.env.MIX_SRC_PATH || 'src/assets')
    .replace(/\/$/, '')

const distPath =
    (process.env.MIX_DIST_PATH || 'dist/assets' )
    .replace(/\/$/, '')

fs.removeSync(process.env.MIX_BASE_PATH)

mix.extend('swiper', webpackConfig => {
    const { rules } = webpackConfig.module;

    rules.filter(rule => rule.exclude && rule.exclude.toString() === "/(node_modules|bower_components)/")
    .forEach(rule => rule.exclude = /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/);
});

mix.setPublicPath(process.env.MIX_BASE_PATH);
mix
// js settings
.setPublicPath(distPath)
.polyfill({
    enabled: true,
    useBuiltIns: "usage",
    targets: {"firefox": "50", "ie": 11}
})
.js(
    `${srcPath}/js/app.js`,
    `${distPath}/js/bundle.js`
)
.swiper()
// .autoload({
//     "vue": ['Vue', 'window.Vue']
// })
.eslint()
// browserSync settings
.browserSync({
    open:  "local",
    host: process.env.MIX_BROWSER_SYNC_HOST || 'localhost',
    port: process.env.MIX_BROWSER_SYNC_PORT || 3000,
    proxy: false,
    server: process.env.MIX_BASE_PATH,
    files: [
        `${distPath}/**/*.(js|css)`,
        `${srcPath}/**/*.(ejs)`
    ],
    https:
    process.env.MIX_BROWSER_SYNC_HTTPS_CERT &&
    process.env.MIX_BROWSER_SYNC_HTTPS_KEY
    ? {
        cert: process.env.MIX_BROWSER_SYNC_HTTPS_CERT,
        key: process.env.MIX_BROWSER_SYNC_HTTPS_KEY
    }
    : false
})
.sourceMaps(false, 'inline-cheap-module-source-map')

// ejs settings
.ejs(
    `${srcPath}/ejs`,
    process.env.MIX_BASE_PATH,
    {
    mix: (filePath = '') =>
        process.env.NODE_ENV === 'production'
        ? basePath + filePath + '?id=' + Date.now()
        : basePath + filePath
    },
    {
    base: `${srcPath}/ejs`,
    root: `${srcPath}/ejs`,
    partials: `${srcPath}/ejs/partials`
    }
)

// copies resources
.copyWatched(
    `${srcPath}/fonts`,
    `${distPath}/fonts`,
    { base: `${srcPath}/fonts` }
)
// copies resources
.copyWatched(
    `${srcPath}/ico`,
    `${distPath}/ico`,
    { base: `${srcPath}/ico` }
)


if (process.env.NODE_ENV === 'production') {
    webpackPlugins.push(
        new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
              preset: ['default', 
                    { 
                      autoprefixer: {
                         // autoprefixerによる vendor prefix の追加を行う   
                         add: true,   
                         // サポートするブラウザVersionの指定    
                         browsers: ["last 2 versions", "ie >= 11", "Android >= 4"]
                      },
                      // ライセンスも含めて、コメントを全て削除する
                      discardComments: { removeAll: true }, 
                      // CSSの定義のソートを行う    
                      cssDeclarationSorter : { order: 'smacss' }
                }
              ],
            },
            canPrint: true
        })
    )
}
mix.webpackConfig({
    plugins: webpackPlugins,
    module: {
      rules: [
        { // Allow .scss files imported glob
          test: /\.scss/,
          loader: 'import-glob-loader'
        },
      ]
    }
})


// sass settings
glob.sync(`${srcPath}/sass/*.scss`).map(function (file) {
    mix.sass(file, `${distPath}/css/`)
    .stylelint({ context: srcPath })
    .options({ processCssUrls: false })
})
// image minsettings
if (process.env.NODE_ENV === 'production') {
    mix
    .imagemin(
        [ 'img/**/*' ],
        { context: srcPath },
        {
            test: filePath => !!multimatch(filePath, [ 'img/**/*' ]).length,
            pngquant: { strip: true, quality: 65-80}, // 0 ~ 100
            gifsicle: { optimizationLevel: 1 }, // 1 ~ 3
            plugins: [ require('imagemin-mozjpeg')({ quality: 80 }) ] // 0 ~ 100
        }
    )
    .then(() => {
        fs.removeSync(`${distPath}/mix-manifest.json`)
    })
}else {
    mix
    .copyWatched(
        `${srcPath}/img`,
        `${distPath}/img`,
        { base: `${srcPath}/img` }
    )
}

