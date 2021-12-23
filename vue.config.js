// vue.config.js
module.exports = {
  // https://cli.vuejs.org/config/#devserver-proxy
  devServer: {
    port: 3000,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/styles/global.scss";
            `,
      },
    },
  },
};
