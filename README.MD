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
    
组件和自定义类的导入导出：module.exports=__  ,   export default  __     import __ from ''

四、矢量图icon当作输入法来使用:
在阿里图库里找到图，新建项目，然后生成font-face,在标签中使用直接用网站unicode,在content中或双引号中用，则只用后边的\e605

五、添加图片的翻转效果，主要用到backface-visibility ，z-index；还不太熟，
  设置3D 变换:transform-style: preserve-3d;
  然后添加两面，front 和back；back直接翻转180deg， transform: rotateY(180deg)
  
重点：transform ,trasation,animate 用法和区别：变换，过渡和动画；
  transform ：变角度，2D 和3D变化，变大小，拉伸，压缩，旋转，偏移
  transation:简单的属性变化过度动画，位置，颜色，大小，等等
  animate：就是动画了
  
