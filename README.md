# ReactRxBingMap
A ReactJS component that allows you to leverage the rich features of Bing Services and [RxBingMaps](https://github.com/erikschlegel/RxBingMap), while bridging all interaction events, pushpins, service calls and map movements as async reactive streams. Currently all API calls into the existing Bing Ajax control are synchronous and blocking invocations. This library converts all map canvas input events, service calls and geo-coordinate transitional movements as observable sequences. This component also exposes a user friendly [service interface](https://github.com/erikschlegel/RxBingServices) into Bing Spatial Data and Location services. You can integrate any [open data REST service(s)](http://www.programmableweb.com/api/nyc-open-data) while utilizing this component to visualize the geolocation content. 
<img src="https://cloud.githubusercontent.com/assets/7635865/10552923/2d743ddc-7425-11e5-94a7-c652ce026214.gif" />

### Usage
At the core, this framework currently offers two available react components: `1. map` `2. pushpin`. This framework is a wrapper extension into [RxBingMaps](https://github.com/erikschlegel/RxBingMap). We're diligently working towards adding more  components to support notifications, polylines, movement transition(although this is supported in the RxBing library), directions, transit updates and many more. 

##### Installation
```
npm install --save react-rx-bing-map
```
##### For your HTML page
```html
     <!--The dom element your map will be binded to -->
   	 <div id='mapDiv' style="position:absolute; width:100%; height:100%;"></div>
      
      <!--This include is required-->
      <script type="text/javascript" src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0"></script>

      !--Your stuff-->
      <script type="text/javascript" src="../dist/bingMapsExample.js"></script>
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
                  icon: 'beacon.png',
                  width: 25, height: 39,
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
If `CenterMap` is enabled, the map will default your initial view to your current location. `MapReferenceId` is the dom id reference that React will use for rendering. You can have as many as you need. `enableHighDpi` increases the resolution quality of the map rendering, but can hinder performance. You'll need a [bing application key](https://msdn.microsoft.com/en-us/library/ff428642.aspx), which is ridiculously easy to obtain and won't take you more than a minute. You can set an initial default view by including the `initialMapViews` property and provide a list of [ViewOptions](https://msdn.microsoft.com/en-us/library/gg427628.aspx).
All other options supported by this control can be found on the [Bing API docs](https://msdn.microsoft.com/en-us/library/gg427603.aspx)

##### Pushpin Usage
Adding a pushpin to a map is as easy as adding a `BingPushpin` child element to a `BingMap`. The `location` property indicates the geo location of the pin. You can customize the asset location of the `icon` used for the pin. A really useful feature with this library is the Bing Location Service feature by using `locationServiceCB`. RxBingMap will retrieve the location details for your pushpin automatically and invoke your async callback via Rx and provide you with access to the response from Bing. Your callback returns a string that will be used for the pin tooltip. 
All other supported options can be found on the API docs for [PushpinOptions](https://msdn.microsoft.com/en-us/library/gg427629.aspx)

## License
Copyright (C) 2015 Microsoft, licensed MIT.
