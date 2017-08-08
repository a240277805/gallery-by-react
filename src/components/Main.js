require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import ImgFigure from './ImgFigure';
import getRangeRandom from './Tools';
import imageDatas from './ImageDatas';
import ControllerUnit from './ControllerUnit';


class AppComponent extends React.Component {
  /***
   * 构造函数
   * @param props
   */
  constructor(props){
    super(props);

    this.initData();
  }

  /***
   * 初始化
   */
  initData(){
    console.log("enter initData");
    this.state={
      imgsArrangeArr:[
      ]
    }

    this.Constant={
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: {//水平方向取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: { //垂直方向取值范围
        x: [0, 0],
        topY: [0, 0]
      }
    };
    imageDatas.forEach(function (value, index) {
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index]=value;
        this.state.imgsArrangeArr[index].isInverse=false;
        this.state.imgsArrangeArr[index].isCenter=false;
        console.log("初始化第"+index+"个:"+JSON.stringify(value));
      }
    }.bind(this));
  }

  /***
   * 从新构造图片组件和控制组件
   */
  createImgsAndUnits(){
    console.log("enter createImgsAndUnits");
    //重新渲染图片组件
    this.imgFigures=[];
    this.controllerUnits=[];
    imageDatas.forEach(function (value, index) {
    // debugger;
      this.imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index} styleObj={this.state.imgsArrangeArr[index]} RarrangeEvent={this.clickRarrange(index)} Inverse={this.inverse(index)}/>);
       this.controllerUnits.push(<ControllerUnit key={index} data={value}  styleObj={this.state.imgsArrangeArr[index]} RarrangeEvent={this.clickRarrange(index)} Inverse={this.inverse(index)}/>);
    }.bind(this));
  }

  /***
   * 渲染函数
   * @returns {XML}
   */
  render() {
    console.log("enter Render");
    this.createImgsAndUnits();

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {this.imgFigures}
        </section>
        <nav className="controller-nav">
          {this.controllerUnits}
        </nav>
      </section>
    );
  }

  //组件加载以后，为每张图片计算其位置的范围
  componentDidMount() {
    console.log("enter componentDidMount");
    //首先拿到舞台的大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    //拿到一个imageFiguire的大小
    var imgFiguireDOM = ReactDOM.findDOMNode(this.refs.imgFigure0);
    var  imgW = imgFiguireDOM.clientWidth,
      imgH = imgFiguireDOM.clientHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);
    console.log("stageW:"+stageW+"stageH;"+stageH+"imgW:"+imgW+"imgH"+imgH);
    //计算中心图片位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }

    //计算左侧右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfImgW - halfImgW * 3;

    this.Constant.hPosRange.rightSecX[0] = halfStageW - halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;
    //计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfImgW - imgW;
    this.Constant.vPosRange.x[1] = halfImgW;
    this.rearrange(2);
  }

  /***
   * 重新布局
   * @param centerIndex
   */
  rearrange(centerIndex) {
    console.log("enter rearrange");
    var imgsArrangeArr=this.state.imgsArrangeArr,
      Constant=this.Constant,
      centerPos=Constant.centerPos,
      hPosRange=Constant.hPosRange,
      vPosRange=Constant.vPosRange,
      hPosRangeLeftSecX=hPosRange.leftSecX,
      hPosRangeRightSecX=hPosRange.rightSecX,
      hPosRangeY=hPosRange.y,
      vPosRangeTopY=vPosRange.topY,
      vPosRangeX=vPosRange.x,

      imgsArrangeTopArr=[],
      topImgNum=Math.ceil(Math.random()*2), //娶一个或者不取
      topImgSpliceIndex=0,

      imgsArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1);

    //首先居中  centerIndex 的图片
    imgsArrangeCenterArr[0].pos=centerPos;
    //设置中心图片
    for(var i=0;i<imgsArrangeArr.length;i++){
      imgsArrangeArr[i].isCenter=false;
    }

    imgsArrangeCenterArr[0].isCenter=true;
    //取出要布局上侧的图片的状态信息
    imgsArrangeTopArr=imgsArrangeArr.splice(0,topImgNum);

    for(var i=0;i<imgsArrangeTopArr.length;i++){
      imgsArrangeTopArr[i].pos={
        top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
        left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
      };
    }
    //布局左右两侧的图片
    for(var i=0,j=imgsArrangeArr.length,k=j/2;i<j;i++){
      var hPosRangeLORX=null;

      //前半部分左边，右半部分右边
      if(i<k){
       hPosRangeLORX=hPosRangeLeftSecX;
      }else{
        hPosRangeLORX=hPosRangeRightSecX;
      }

      imgsArrangeArr[i].pos={
        top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
        left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
      }
    }

    for(var i=0;i<imgsArrangeTopArr.length;i++){
      imgsArrangeArr.splice(i,0,imgsArrangeTopArr[i]);
    }

      imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);


    console.log("imgsArrangeArr lenght"+imgsArrangeArr.length);
    // 添加角度，定义在正负30度
    imgsArrangeArr.forEach(function (value,index) {
      console.log("添加角度，定义在正负30度 ");
      if(index!=centerIndex){
        console.log("非中间");
        imgsArrangeArr[index].rotate=getRangeRandom(-30,30);
      }else {
        imgsArrangeArr[index].rotate=0;
      }
    })

    this.setState({
      imgsArrangeArr:imgsArrangeArr
    });
    console.log("结尾:"+JSON.stringify(imgsArrangeArr));
  }

  /***
   * 点击图片回调方法，设置中心图片，重新排序，一个闭包函数
   * @param centerIndex
   * @returns {function(this:AppComponent)}
   */
  clickRarrange(centerIndex){
    return function () {
      //首先还原所有数据
      imageDatas.forEach(function (value, index) {
        this.state.imgsArrangeArr[index].isInverse=false;
        this.state.imgsArrangeArr[index].isCenter=false;
      }.bind(this));
      //然后重新排列
      this.rearrange(centerIndex);
    }.bind(this)
  }

  /***
   * 点击图片设置翻转，然后重新设置state,一个闭包函数
   * @param index
   * @returns {function(this:AppComponent)}
   */
  inverse(index){
    return function () {
      var imgsArrangeArr=this.state.imgsArrangeArr;

      imgsArrangeArr[index].isInverse=!imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr:imgsArrangeArr
      });
    }.bind(this);

  }

}

AppComponent.defaultProps = {};

export default AppComponent;
