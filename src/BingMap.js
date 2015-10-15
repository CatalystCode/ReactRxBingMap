import {
  default as React,
  PropTypes,
  Component
} from "react";

import {default as ReactDOM, findDOMNode} from "react-dom";

import {
  default as ReactRxBingMapContainer
} from "./ReactRxBingMapContainer";

export default class BingMap extends Component {
  static propTypes = {
    BingTheme: PropTypes.bool,
    CenterMap: PropTypes.bool,
    ShowTraffic: PropTypes.bool,
    credentials: PropTypes.string.isRequired
  };

  state = {
  }

  componentDidMount () {
    const domElement = findDOMNode(this);
    const {children, ...mapProps} = this.props;
    // TODO: support asynchronous load of bing.maps API at this level.
    //
    // Create  BING Map instance so that dom is initialized before
    // React's children creators.
    //
    const map = ReactRxBingMapContainer._createMap(domElement, mapProps);
    this.setState({ map });
  }

  clearMap(){
    this.state.map.clearEntities();
  }

  render () {
    let containerTagName = "div";
    const {domProps, children, ...mapProps} = this.props;
    const child = this.state.map ? (

      <ReactRxBingMapContainer map={this.state.map} {...mapProps}>
        {children}
      </ReactRxBingMapContainer>
    ) : undefined;

    return React.createElement(containerTagName, domProps, child);
  }
}
