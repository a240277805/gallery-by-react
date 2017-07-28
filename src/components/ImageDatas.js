/**
 * Created by zmk on 2017/7/27.
 */
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

export default imageDatas;
