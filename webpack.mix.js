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

const srcRelativePath =
  (process.env.MIX_SRC_RELATIVE_PATH || 'src')
    .replace(/\/$/, '')
const distRelativePath =
  (process.env.MIX_DIST_RELATIVE_PATH || 'dist')
    .replace(/\/$/, '')
const basePath =
  (process.env.MIX_BASE_PATH || '')
    .replace(/\/$/, '')

fs.removeSync(distRelativePath)

mix
// js settings
.setPublicPath(distRelativePath)
.polyfill()
.js(
    `${srcRelativePath}/js/app.js`,
    `${distRelativePath}/js/bundle.js`
)
.autoload({
    "vue": ['Vue', 'window.Vue']
})
.eslint()
// browserSync settings
.browserSync({
    open: "external",
    reloadOnRestart: true,
    host: process.env.MIX_BROWSER_SYNC_HOST || 'localhost',
    port: process.env.MIX_BROWSER_SYNC_PORT || 3000,
    proxy: false,
    server: './',
    files: [
        `${distRelativePath}/**/*`,
        `./**/*.html`
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
    `${srcRelativePath}/ejs`,
    `./`,
    {
    mix: (filePath = '') =>
        process.env.NODE_ENV === 'production'
        ? basePath + filePath + '?id=' + Date.now()
        : basePath + filePath
    },
    {
    base: `${srcRelativePath}/ejs`,
    root: `${srcRelativePath}/ejs`,
    partials: `${srcRelativePath}/ejs/partials`
    }
)

// copies resources
.copyWatched(
    `${srcRelativePath}/fonts`,
    `${distRelativePath}/fonts`,
    { base: `${srcRelativePath}/fonts` }
)
// copies resources
.copyWatched(
    `${srcRelativePath}/ico`,
    `${distRelativePath}/ico`,
    { base: `${srcRelativePath}/ico` }
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
glob.sync(`${srcRelativePath}/sass/*.scss`).map(function (file) {
    mix.sass(file, `${distRelativePath}/css/`)
    .stylelint({ context: srcRelativePath })
    .options({ processCssUrls: false })
})
// image minsettings
if (process.env.NODE_ENV === 'production') {
    mix
    .imagemin(
        [ 'img/**/*' ],
        { context: srcRelativePath },
        {
        test: filePath => !!multimatch(filePath, [ 'img/**/*' ]).length,
        pngquant: { strip: true, quality: 65-80}, // 0 ~ 100
        gifsicle: { optimizationLevel: 1 }, // 1 ~ 3
        plugins: [ require('imagemin-mozjpeg')({ quality: 80 }) ] // 0 ~ 100
        }
    )
    .then(() => {
        fs.removeSync(`${distRelativePath}/mix-manifest.json`)
    })
}else {
    mix
    .copyWatched(
        `${srcRelativePath}/img`,
        `${distRelativePath}/img`,
        { base: `${srcRelativePath}/img` }
    )
}

