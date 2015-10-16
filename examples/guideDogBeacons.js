import {default as React, Component} from "react";
import {default as BingMap} from "../src/BingMap";
import {default as BingPushpin} from "../src/BingPushpin";
import {default as ReactDOM} from "react-dom";
import Rx from 'rx';
import Config from '../config.json'

const BeaconServiceEndpoint = 'http://guidedogservices-beacons.azurewebsites.net/api/beacongroups';

export default class BeaconViewer extends Component {
  constructor(props) {
    super(props);

    this.startLoadingProgress();

    this.state = {
      markers: []
    };

    this.beaconGetAllService();
  }

  startLoadingProgress(){
    this.notify = $.notify('<strong>Beacons are Loading</strong> please wait...', {
          type: 'success',
          allow_dismiss: false,
          showProgressbar: true
        },{
        placement: {
          from: "top",
          align: "left"
        }});
  }

  beaconGetAllService(){
    let self = this;
    let beaconInstanceCounter = 0;

    Rx.DOM.ajax({
                     url: BeaconServiceEndpoint,
                     method:'GET',
                     responseType: 'json',
                     headers: {
                       'Content-Type':'application/json; charset=utf-8'
                     }
                   })
      .subscribe(response => {
          if(response.response && response.response.value && response.response.value.length > 0){
              Rx.Observable.from(response.response.value)
                           .filter(beacon => (beacon.Location && beacon.OwnerKey))
                           .subscribe(beacon => self.state.markers.push(BeaconViewer.transformBeaconToPushpin(beacon, ++beaconInstanceCounter)),
                                      error => console.error('An error occured processing the get all beacon service: ' + error),
                                      () => {
                                              self.setState({markers: self.state.markers});
                                              self.refs.map.state.map.addTransitionViewSequences(self.transitionCoordinateToMovement(self.state.markers[0].location));
                                              self.notify.close();
                                            });
          }
      },
      error => console.log('An Error occured while processing the beacon service: ' + error));
  }

  static transformBeaconToPushpin(beacon, count){
    let beaconLocation = beacon.Location.split(',');
    let majorMinor = beacon.PartitionKey.split('_');

    return {
        location: {
            latitude: beaconLocation[0],
            longitude: beaconLocation[1]
        },
        draggable: false,
        tooltipText: "<b><u>Beacon Location</u></b>: <br>Coordinates {0},{1}<br>Major: {2}<br>Minor: {3}<br>Owner: {4}<br>UUID: {5}".format( beaconLocation[0], beaconLocation[1], majorMinor[0], majorMinor[1], beacon.OwnerKey, beacon.RowKey),
        textOffset: new Microsoft.Maps.Point(0, 0),
        icon: 'beacon.png',
        width: 25, height: 39,
        anchor:new Microsoft.Maps.Point(0,0),
        key: Date.now() + count
    }
  }

  transitionCoordinateToMovement(location){
    return [{
             center: {
               latitude: location.latitude,
               longitude: location.longitude
             },
             zoom: 18,
             animate: true
          }]
  }

  render () {
    let defaultView = [this.state.markers.length > 0 ? this.transitionCoordinateToMovement(this.state.markers[0].location) : {} ];

    return (
      <BingMap MapReferenceId="mapDiv"
               BingTheme={true}
               CenterMap= {false}
               enableHighDpi={false}
               initialMapViews={defaultView}
               ShowTraffic={false}
               ref="map"
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

ReactDOM.render(<BeaconViewer />, document.getElementById("mapDiv"));
