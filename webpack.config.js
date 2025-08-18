const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  // For GitHub Pages, use relative paths
  const publicPath = isProduction ? './dist/' : '/dist/';
  
  return {
    entry: {
      index: './src/index.ts',
      ui: './src/ui.ts'
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                sourceMap: true,
                skipLibCheck: true
              },
              transpileOnly: true
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: publicPath,
      library: {
        name: '[name]',
        type: 'umd',
        export: 'default',
      },
      globalObject: 'this',
      clean: true, // Clean dist folder on each build
    },
    plugins: [
      new Dotenv({
        path: path.resolve(__dirname, '.env'),
        safe: false, // Don't require .env.example
        systemvars: true, // Allow system environment variables
        silent: false // Show errors if .env file is missing
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, '.'),
      },
      compress: true,
      port: 9000,
    },
  };
};