import RxBingMap from 'rx-bing-map';
import {
  default as React,
  Component,
  Children,
} from "react";

export default class ReactRxBingMapContainer extends Component {
    static _createMap (domEl, properties) {
      return new RxBingMap(properties, domEl);
    }

    getMap () {
      return this.props.map;
    }

    render () {
      return (
        <div className={this.props.className || ''}>
          {Children.map(this.props.children, (childElement) => {
            if (React.isValidElement(childElement)) {
              return React.cloneElement(childElement, {
                mapContainerRef: this,
              });
            } else {
              return childElement;
            }
          })}
        </div>
      );
    }
}
