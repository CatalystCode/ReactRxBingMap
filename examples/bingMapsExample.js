import {default as React, Component} from "react";
import {default as BingMap} from "../src/BingMap";
import {default as BingPushpin} from "../src/BingPushpin";
import {default as ReactDOM} from "react-dom";
import Config from '../config.json'

String.prototype.format = function(){
   var content = this;
   for (var i=0; i < arguments.length; i++)
   {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
   }
   return content;
};

export default class GettingStarted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
                  location: {
                      latitude: 25.0112183,
                      longitude: 121.52067570000001
                  },
                  draggable: false,
                  locationServiceCB: (location) => "<b><u>Location</u></b>: {2}<br>Coordinates {0},{1}".format(location.point.coordinates[0], location.point.coordinates[1], location.name),
                  textOffset: new Microsoft.Maps.Point(0, 0),
                  icon: 'beacon.png',
                  width: 25, height: 39,
                  anchor:new Microsoft.Maps.Point(0,0),
                  key: Date.now()
    }]};
  }

  render () {
    let defaultView = [{
       center: {
         latitude: this.state.markers[0].location.latitude,
         longitude: this.state.markers[0].location.longitude
       },
       zoom: 15,
       animate: true
    }];

    return (
      <BingMap MapReferenceId="mapDiv"
               BingTheme={true}
               CenterMap= {false}
               enableHighDpi={false}
               initialMapViews={defaultView}
               ShowTraffic={false}
               ServiceAPIKey={Config.BingServiceKey}
               credentials={Config.BingMapsApiKey} >
                {this.state.markers.map((marker, index) => {
                  return (
                    <BingPushpin {...marker} />
                  );
                })}
      </BingMap>
    );
  }
}

ReactDOM.render(<GettingStarted />, document.getElementById("mapDiv"));
