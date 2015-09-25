import {
  default as React,
  PropTypes,
  Component,
  findDOMNode,
} from "react";

import {
  default as ReactRxBingMapContainer
} from "./ReactRxBingMapContainer";

export default class ReactRxBingMap extends Component {

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

  render () {
    const {containerTagName, containerProps, children, ...mapProps} = this.props;
    const child = this.state.map ? (
      // Notice: implementation details
      //
      // In this state, the DOM of google.maps.Map is already initialized in
      // my innerHTML. Adding extra React components will not clean it
      // in current (0.13.3) version. It will use prepend to add DOM of
      // GoogleMapHolder and become a sibling of the DOM of google.maps.Map
      // Not sure this is subject to change
      //
      <ReactRxBingMapContainer map={this.state.map} {...mapProps}>
        {children}
      </ReactRxBingMapContainer>
    ) : undefined;

    return React.createElement(containerTagName, containerProps, child);
  }
}
