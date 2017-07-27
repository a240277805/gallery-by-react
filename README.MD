2017/07/19

启动：npm start

from: 慕课网 构建画廊应用。

一、项目构建
  用yeoman 
    安装
    npm install -g yo
    npm install -g generator-react-webpack
二、介绍目录结构
.editorconfig ：约定代码风格
.eslintrc:代码风格检测工具，约束js写法
.yo-rc.json： 记录yeoman 配置信息
karma.conf.js:  karma测试框架的配置文件


安装浏览器自适应的css 插件：npm install autoprefixer-loader --save-dev
添加json  解析 loader: npm install json-loader --save-dev
webstorm 不能实时热更新问题： system setting -> 去掉默认勾选save write

三、自执行函数

//获取图片相关数据
var imageDatas = require("../data/imageDatas.json");
//利用自执行函数，将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {
  for (var i = 0; i < imageDatasArr.length; i++) {
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }

  return imageDatasArr;
})(imageDatas);



bind:，React构造方法中的bindV  
即将handleClick函数与这个组件Component进行绑定以确保在这个处理函数中使用this时可以时刻指向这一组件。
    this.clickHandler=this.clickHandler.bind(this);
