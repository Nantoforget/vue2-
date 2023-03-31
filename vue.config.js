const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        host: "127.0.0.1",
        port: 8080,
        proxy: {
            "/api": {
                target: "http://sph-h5-api.atguigu.cn",
                // pathRewrite: { "/api": "" },//真实接口有api，不需要重新
            },
        },
    },
});
