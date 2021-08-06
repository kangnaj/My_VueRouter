// npm run serve 执行  vue-cli-serve serve
// vue-cli-serve.js
// 创建serive实例
const Service = require('../lib/Service')

// minimist解析工具来对命令行参数进行解析
const args = require('minimist')(rawArgv, {
  boolean: [
    // build
    // FIXME: --no-module, --no-unsafe-inline, no-clean, etc.
    'modern',
    'report',
    'report-json',
    'inline-vue',
    'watch',
    // serve
    'open',
    'copy',
    'https',
    // inspect
    'verbose'
  ]
})
// 执行run方法
service.run(command, args, rawArgv).catch(err => {
  error(err)
  process.exit(1)
})

class Service {
  constructor () {
     // 获取package.json中的依赖
    //  通过read-pkg这个包读取package.json文件，并以JSON格式返回赋值给this.pkg。
     this.pkg = this.resolvePkg(pkg)

     // 解析每个命令使用的默认模式
    //{ serve: 'development',
    // build: 'production',
    // inspect: 'development' }
    this.plugins = this.resolvePlugins(plugins, useBuiltIn)
    this.modes = this.plugins.reduce((modes, { apply: { defaultModes }}) => {
      return Object.assign(modes, defaultModes)
    }, {})
    // 初始化相关插件。相关插件包括：内联插件、package.json中的cli-plugin-*插件。内联插件包含serve、build、inspect等
  }

  resolvePlugins (inlinePlugins, useBuiltIn) {
    const idToPlugin = (id, absolutePath) => ({
      id: id.replace(/^.\//, 'built-in:'),
      apply: require(absolutePath || id)
    })

    let plugins

    const builtInPlugins = [
      './commands/serve',
      './commands/build',
      './commands/inspect',
      './commands/help',
      // config plugins are order sensitive
      './config/base',
      './config/assets',
      './config/css',
      './config/prod',
      './config/app'
    ].map((id) => idToPlugin(id))
    if (inlinePlugins) {
      // ...
    } else {
        // 开发环境依赖+生产环境的依赖中，获取cli-plugin-*插件
      const projectPlugins = Object.keys(this.pkg.devDependencies || {})
        .concat(Object.keys(this.pkg.dependencies || {}))
        .filter(isPlugin)    // 验证是否为vue-cli插件 cli-plugin-*
        .map(idToPlugin)
      plugins = builtInPlugins.concat(projectPlugins)
    }
  }
  init(mode) {
    this.initialized = true
    this.mode = mode

    // load mode .env
    if (mode) {
      this.loadEnv(mode)
    }
    // load base .env
    this.loadEnv()
  }
  // 运行service.run方法，加载环境变量，加载用户配置，应用插件。
  async run (name, args = {}, rawArgv = []) {
    const mode = args.mode || (name === 'build' && args.watch ? 'development' :           this.modes[name])

    // 加载环境变量，加载用户配置，应用插件
    this.init(mode)
  
    args._ = args._ || []
      // 注册完的命令集里获取对应的命令
    let command = this.commands[name]
    // ....
    
    const { fn } = command
    return fn(args, rawArgv)
}
}

// 内联插件默认导出了一个defaultModes
 // serve.js

//  注册命令。在service注册serve命令（前面run方法最后调用了fn函数，也就是registerCommand的第三个参数）
api.registerCommand('serve', {
  description: 'start development server',
  usage: 'vue-cli-service serve [options] [entry]',
  options: {}
}, async function serve (args) {
  //创建webpack编译器
  const compiler = webpack(webpackConfig)
  // compiler.run()即可完成一次编译打包

  // 创建本地服务
  const server = new WebpackDevServer(compiler, Object.assign({
      clientLogLevel: 'none',
      historyApiFallback: {
        disableDotRule: true,
        rewrites: [
          { from: /./, to: path.posix.join(options.baseUrl, 'index.html') }
        ]
      },
      contentBase: api.resolve('public'),
      watchContentBase: !isProduction,
      hot: !isProduction,
      quiet: true,
      compress: isProduction,
      publicPath: options.baseUrl,
      overlay: isProduction // TODO disable this
        ? false
        : { warnings: false, errors: true }
    }, projectDevServerOptions, {
      https: useHttps,
      proxy: proxySettings,
  }))
  
  return new Promise((resolve, reject) => {
    compiler.hooks.done.tap('vue-cli-service serve', stats => {
        // ...
    })
    // ...
    server.listen(port, host, err => {
        if (err) {
          reject(err)
        }
    })
  })
});

// 最终执行的serve.js 内注册serve时传递的方法。
// webpack获取到配置之后，实例化Compiler 传递给webpackDevServer，通过webpackDevServer实现自动编译和热更新

 module.exports.defaultModes = {
  serve: 'development'
}