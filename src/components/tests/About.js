/**
 * Created by zmk on 2017/8/8.
 */
import React from 'react'

class AboutComponent extends React.Component {

  constructor(props){
    super(props)
  }
  componentDidMount() {}

  render() {
    console.log("enter render func");
    const { location, children } = this.props;
    return  (
      <div>
        <h3 className="home">About</h3>
        {children}
      </div>
    )
  }
}

AboutComponent.defaultProps = {};
export default AboutComponent;
