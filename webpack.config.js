const path = require('path');

module.exports = {
  module: {
    rules: [{
      test: /\.mp4$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "video"
          }
        }
      ]
    }],
    webpackFinal: async (config, { configType }) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // <------
        path: false // <-----
      };
      return config;
    }
  },
};