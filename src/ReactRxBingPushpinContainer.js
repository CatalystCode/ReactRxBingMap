import {
  default as React,
  PropTypes,
  Component,
  Children,
} from "react";

import extend from 'extend';

const defaultPinProps = {
   draggable: false,
   height: 40,
   width: 40,
   textOffset: new Microsoft.Maps.Point(0, 0)
};

export default class ReactRxBingPushpinContainer extends Component {
  static _initOptions(pinProps){
    return extend(true, {}, defaultPinProps, pinProps);
  }

  static _createPin(mapContainerRef, pinProps, pinLocation, eventHandlers) {
    let map = mapContainerRef.getMap();
    if(map)
        return map.pushPins([{location: pinLocation, pinOptions: ReactRxBingPushpinContainer._initOptions(pinProps)}], eventHandlers);
  }

  getMarker () {
    return this.props.marker;
  }

  render () {
    const {mapContainerRef, children} = this.props;

    if (0 < Children.count(children)) {
      return (
        <div>{Children.map(children, childElement =>
          React.cloneElement(childElement, {
            mapContainerRef,
            pinHolderRef: this
          })
        )}</div>
      );
    } else
        return (<noscript />);
  }
}
