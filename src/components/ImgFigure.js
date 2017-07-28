/**
 * Created by zmk on 2017/7/27.
 */
require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';

export  default class ImgFigure extends React.Component {

  constructor(props) {
    console.log("enter  ImgFigure constructor");
    super(props);

    this.clickHandler = this.clickHandler.bind(this);

  }

  clickHandler(e) {
    console.log("enter  ImgFIgure clickHandler");
    e.preventDefault();
    e.stopPropagation();

    if (this.props.data.isCenter) {
      this.props.Inverse();
    } else {
      this.props.RarrangeEvent();
    }

  }

  render() {
    console.log("enter  ImgFigure render");
    var styleObj = {};
    //如果props属性中制订了这张图片的位置，则使用
    if (this.props.styleObj.pos) {

      styleObj = this.props.styleObj.pos;
    }
    //如果图片的旋转角度有直并且不为0，添加旋转角度
    if (this.props.styleObj.rotate) {
      (['moz', 'ms', 'webkit', '']).forEach(function (value) {
        styleObj[value + "transform"] = "rotate(" + this.props.styleObj.rotate + "deg)";
      }.bind(this));
    }
    var imgFigureClassName = "img-figure";
    imgFigureClassName += this.props.data.isCenter ? " is-Center" : "";
    var inverseClassName="front";
         inverseClassName += this.props.data.isInverse ? " is-inverse" : "";
    // debugger;
    // {/*<figure className={imgFigureClassName} style={styleObj} onClick={this.clickHandler}>*/}
    // {/*<img src={this.props.data.imageURL} alt={this.props.data.title}/>*/}
    // {/*<figcaption>*/}
    // {/*<h2 className="img-title">{this.props.data.title}</h2>*/}
    // {/*<div className="img-back" >*/}
    // {/*<p>{this.props.data.description}</p></div>*/}
    // {/*</figcaption>*/}
    // {/*</figure>*/}
    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.clickHandler}>
        <div className={inverseClassName}>
          <img src={this.props.data.imageURL} alt={this.props.data.title}/>
          <figcaption>
            <div className="img-title">
              <h3>Hanson <span> Deck</span></h3>
            </div>
            <div className="caption">
              <p>I'm killing time while I wait</p>
            </div>
          </figcaption>
        </div>
        <div className="back">
          <div className="back-img">      <p>{this.props.data.description}</p></div>

        </div>


        <a href="#"></a>

      </figure>
    );
  }
}
