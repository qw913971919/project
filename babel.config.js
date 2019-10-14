module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins:[
    [
      "component",
      {
        "libraryName": "mint-ui",
        "style": true
      }
    ]
],
  ignore:["./src/lib/mui/js/mui.min.js"]//忽略这个文件中因为严格模式导致的问题，前提是有安装过 babel-plugin-transform-remove-strict-mode -D
}
