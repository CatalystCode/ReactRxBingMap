# ReactRxBingMap
A ReactJS component that allows you to leverage the rich features of Bing Services and [RxBingMaps](https://github.com/erikschlegel/RxBingMap), while bridging all interaction events, pushpins, service calls and map movements as async reactive streams. Currently all API calls into the existing Bing Ajax control are synchronous and blocking invocations. This library converts all map canvas input events, service calls and geo-coordinate transitional movements as observable sequences. This component also exposes a user friendly [service interface](https://github.com/erikschlegel/RxBingServices) into Bing Spatial Data and Location services. You can integrate any [open data REST service(s)](http://www.programmableweb.com/api/nyc-open-data) while utilizing this component to visualize the geolocation content. 
<img src="https://cloud.githubusercontent.com/assets/7635865/10552923/2d743ddc-7425-11e5-94a7-c652ce026214.gif" />

### Usage
At the core, this framework currently offers two available react components: `1. map` `2. pushpin`. This framework is a wrapper extension into [RxBingMaps](https://github.com/erikschlegel/RxBingMap). We're currently working on adding components for notifications, polylines, movement transition(although this is supported in the RxBing library), directions, transit updates and many more. 

##### Installation
```
npm install --save react-rx-bing-map
```

##### For your React Component
```js
import {BingMap, BingPushpin} from "react-rx-bing-map";
import {default as React, Component} from "react";

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
    return (
      <BingMap MapReferenceId="mapDiv"
               BingTheme={true}
               CenterMap= {false}
               enableHighDpi={false}
               initialMapViews={[{center: {latitude: 25.0112183, longitude: 121.520675}, zoom: 18, animate: true}]}
               ShowTraffic={false}
               ref="map"
               credentials={YOUR_BING_MAP_API_KEY} >
                {this.state.markers.map((marker, index) => {
                  return (
                    <BingPushpin {...marker} />
                  );
                })}
      </BingMap>
    );
```

##### BingMap Usage
If CenterMap is enabled, the map will default your intitial view to your current location. MapReferenceId is the dom id reference for which div element the component should be rendered to. You can have as many as you need. enableHighDpi increases the resolution quality of the map rendering, but can hinder performance. You'll need a [bing application key](https://msdn.microsoft.com/en-us/library/ff428642.aspx), which is ridicolously easy to obtain and won't take you more than a minute. You can set an intial default view by including the `initialMapViews` property and provide a list of [ViewOptions](https://msdn.microsoft.com/en-us/library/gg427628.aspx).

