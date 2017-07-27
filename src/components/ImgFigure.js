/**
 * Created by zmk on 2017/7/27.
 */
require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';

export  default class ImgFigure extends React.Component{

  constructor(props){
    super(props);

    this.clickHandler=this.clickHandler.bind(this);

  }

  clickHandler(e){

    if(this.props.data.isCenter){
      this.props.isInverse();
    }else{
      this.props.RarrangeEvent();
    }
  }

  render () {
    var styleObj={};
    //如果props属性中制订了这张图片的位置，则使用
    if(this.props.styleObj.pos){

      styleObj=this.props.styleObj.pos;
    }
    //如果图片的旋转角度有直并且不为0，添加旋转角度
    if(this.props.styleObj.rotate){
      (['moz','ms','webkit','']).forEach(function (value) {
        styleObj[value+"transform"]= "rotate("+this.props.styleObj.rotate+"deg)";
      }.bind(this));
    }

    var imgFigureClassName="img-figure";
    imgFigureClassName +=this.props.data.isInverse?" is-inverse":"";

    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.clickHandler}>
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}
