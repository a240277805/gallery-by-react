/**
 * Created by zmk on 2017/7/28.
 */
import React from 'react';
//控制组件
export default  class ConstrollerUnit extends React.Component{
  constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this);
  }
  handleClick(e){
    console.log("enter  ConstrollerUnit handleClick");
    e.preventDefault();
    e.stopPropagation();

    if(this.props.data.isCenter){
      this.props.Inverse();
    }else {
      this.props.RarrangeEvent();
    }
  }


  render(){
    console.log("enter  ConstrollerUnit render");
    var className="controller-unit";
        className+=this.props.data.isCenter?" isCenter":"";
        className+=this.props.data.isInverse?" is-inverse":"";
    return (
      <span className={className} onClick={this.handleClick}></span>
    );
  }

}
