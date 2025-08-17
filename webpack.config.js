const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const publicPath = isProduction ? '/vibe-codesitor/dist/' : '/dist/';
  
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
              },
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
    devServer: {
      static: {
        directory: path.join(__dirname, '.'),
      },
      compress: true,
      port: 9000,
    },
  };
};