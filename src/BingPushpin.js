import {
  default as React,
  Component, PropTypes
} from "react";

import {
  default as ReactRxBingPushpinContainer
} from "./ReactRxBingPushpinContainer";

export default class BingPushpin extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  static defaultProps = { location: {} };

  state = {
  }

  componentDidMount () {
    const {mapContainerRef, location, eventHandlers, ...pinOptions} = this.props;
    const pin = ReactRxBingPushpinContainer._createPin(mapContainerRef, pinOptions, location, eventHandlers || {});

    this.setState({ pin });
  }

  render () {
    if (this.state.pin) {
      return (
        <ReactRxBingPushpinContainer pin={this.state.pin} {...this.props}>
          {this.props.children}
        </ReactRxBingPushpinContainer>
      );
    } else {
      return (<noscript />);
    }
  }
}
