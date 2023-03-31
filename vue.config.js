const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        host: "127.0.0.1",
        port: 8080,
        proxy: {
            "/api": {
                target: "http://39.98.123.211",
                pathRewrite: { "/api": "" },
            },
        },
    },
});
