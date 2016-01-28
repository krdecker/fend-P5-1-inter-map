




///////////////////MODEL///////////////////////

//get & hold various chunks of data
// json objects returned from apis
// lists of sites on each map-view



// eats data: an array of places
var EatsModel = {
    zoomLevel: 19,
    center: {lat: 49.262252, lng: -123.069801},
    spots: [
        {
            name: "A&W Restaurant",
            location: {lat: 49.262535, lng: -123.069399}
        },
        {
            name: "Uncle Fatih's Pizza",
            location: {lat: 49.262517, lng: -123.070177}
        },
        {
            name: "Booster Juice",
            location: {lat: 49.262641, lng: -123.069438}
        },
        {
            name: "Starbucks Coffee",
            location: {lat: 49.261874, lng: -123.070176}
        },
        {
            name: "Blenz Coffee",
            location: {lat: 49.262534, lng: -123.069529}
        },
        {
            name: "Megabite Pizza",
            location: {lat: 49.262779, lng: -123.069317}
        },
        {
            name: "Broadway Station Sushi",
            location: {lat: 49.262084, lng: -123.070962}
        }
    ]
};

var model = EatsModel;

///////////////MAP API VIEWMODEL///////////////////////////

var map, markers, infoWindow;

//get rid of all Google's POI and Transit features on our map
var cleanSweep = [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                  { visibility: "off" }
            ]
        },
        {
            featureType: "transit",
            elementType: "labels",
            stylers: [
                  { visibility: "off" }
            ]
        }
      ];

var mapOptions = {
        center: {lat: 49.263, lng: -123.0695},
        // Commercial Broadway Station 49°15′45″N, 123°04′08″W
        scrollwheel: false,
        zoom: 19, // tighter for transit
        //zoom: 18 // for eats etc
        zoomControl: false,
        scrollwheel: false,
        draggable: false,
        disableDefaultUI: true,
        styles: cleanSweep
    }




// INFO WINDOW DEF
// this will eventually contain info return by Ajax calls to APIs

    // load streetview
// var streetviewUrl = '';
// var picture = '';

//var css = '"height:100%;width:100%;font-size:4em;color:blue;background-color:orange;padding:5px"';
// var css = '';
// var infoContent = '';



function initMap() {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map-div'), mapOptions );
    markers = [];
    infoWindow = new google.maps.InfoWindow({});

    map.setZoom(model.zoomLevel);
    map.setCenter(model.center);

    setMarkers(model.spots, map);
}



function resetMap(model) {

    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map-div'), mapOptions );

    map.setZoom(model.zoomLevel);
    map.setCenter(model.center);

    setMarkers(model.spots, map);
}

function setMarkers(spots, map) {
    for (var i in spots) {
        var spot = spots[i];

        marker = getMarker(spot.location, spot.name, map);
        markers.push(marker);
    }
}

function stealClick_ (e) {
  e.stopPropagation();
}

// google.maps.event.addDomListener(closeImg, 'click', removeInfoBox(this));
// google.maps.event.addDomListener(contentDiv, 'mousedown', stealClick_);

function getMarker (location, name, map) {
    var markColor = "4f6fcf";

    var marker = new google.maps.Marker({
        position: location,
        title: name,
        map: map,
        opacity: 0.4,
        icon: {
            url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + markColor,
            size: null, //new google.maps.Size(20, 32),
            origin: null, //new google.maps.Point(0, 0),
            anchor: null, //new google.maps.Point(10, 32),
            scaledSize: new google.maps.Size(60, 108)
        }
    });
    // "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFFF00",
    // null,  size is determined at runtime
    // null, /* origin is 0,0 */
    // null, /* anchor is bottom center of the scaled image */
    // new google.maps.Size(42, 68)



    // add Bounce & an Info Window on click event
    // streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + marker.position.toString() + '';
    // picture = '<img class="bgimg" src="' + streetviewUrl + '">';
    // console.log(marker.position.toString());
    //var css = '"height:100%;width:100%;font-size:4em;color:blue;background-color:orange;padding:5px"';
    // css = '"height:100%;width:100%"';
    // infoContent = '<div style=' + css + '><strong>' + picture + '</strong></div>';

    // google.maps.event.addListener(marker, 'click', function() {
    //               marker.setAnimation(google.maps.Animation.BOUNCE);
    //         if (typeof infoWindow != 'undefined') infoWindow.close(); // unique opening

    //         var infoContent = "";
    //         infoWindow = new google.maps.InfoWindow({
    //             content: infoContent
    //         });
    //         infoWindow.content = function() {

    //             var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + marker.position.toString() + '';
    //             var picture = '<img class="bgimg" src="' + streetviewUrl + '">';
    //             console.log("In getInfo: " + marker.position.toString());
    // //var css = '"height:100%;width:100%;font-size:4em;color:blue;background-color:orange;padding:5px"';
    //             var css = '"height:100%;width:100%"';
    //             var content = '<div style=' + css + '>' + picture + '</div>';

    //             return content;
    //         });

    //         setTimeout( function() {
    //             infoWindow.open(map, marker);
    //             if (marker.getAnimation() !== null) marker.setAnimation(null);
    //         }, 1200);
    // });

    // var infoContent = "<p>" + marker.title + "</p><p>" + marker.position.toString() + "</p>";
    // var css = '"height:200px;width:400px;font-size:36pt;color:red;opacity:.6"';
    // var infoContentBox = '<div id="info" style=' + css + '>' + infoContent + '</div>;'

    // var localInfoWindow = new google.maps.InfoWindow({
    //     content: infoContentBox,
    //     maxWidth: 2000
    // })

    // google.maps.event.addListener(marker, 'click', function() {

    //         console.log("after click: on marker " + marker.title );
    //         openAPIslide(marker.title);

            // if ( this.getAnimation() ) {

            //     this.setAnimation( null );
            // }
            // else {

            //     this.setAnimation( google.maps.Animation.BOUNCE );

            // }
            //marker.setAnimation(google.maps.Animation.BOUNCE);
            //setTimeout( function() { if (marker.getAnimation() !== null) marker.setAnimation(null);}, 1200);
    // });

    return marker;
}


//interface to API AJAX system
function openAPIslide(spotName) {
    console.log("In openAPIslide with: " + spotName);
}

// interface to filtration system
function reSetMarkers(spots, map, markers) {
    //console.log("got spots, starting with:" + spots[0].name)
    var names = [];

    for (var i in spots) names.push(spots[i].name);

    for (var j in markers) {
        marker = markers[j];
        //console.log("Checking: " + marker.title);
        if (names.indexOf(marker.title) > -1) marker.setMap(map);
        else marker.setMap(null);
    }
}



// from GMaps API:
// function setMarkers(map) {
//   // Adds markers to the map.

//   // Marker sizes are expressed as a Size of X,Y where the origin of the image
//   // (0,0) is located in the top left of the image.

//   // Origins, anchor positions and coordinates of the marker increase in the X
//   // direction to the right and in the Y direction down.
//   var image = {
//     url: 'images/beachflag.png',
//     // This marker is 20 pixels wide by 32 pixels high.
//     size: new google.maps.Size(20, 32),
//     // The origin for this image is (0, 0).
//     origin: new google.maps.Point(0, 0),
//     // The anchor for this image is the base of the flagpole at (0, 32).
//     anchor: new google.maps.Point(0, 32)
//   };
//   // Shapes define the clickable region of the icon. The type defines an HTML
//   // <area> element 'poly' which traces out a polygon as a series of X,Y points.
//   // The final coordinate closes the poly by connecting to the first coordinate.
//   var shape = {
//     coords: [1, 1, 1, 20, 18, 20, 18, 1],
//     type: 'poly'
//   };
//   for (var i = 0; i < beaches.length; i++) {
//     var beach = beaches[i];
//     var marker = new google.maps.Marker({
//       position: {lat: beach[1], lng: beach[2]},
//       map: map,
//       icon: image,
//       shape: shape,
//       title: beach[0],
//       zIndex: beach[3]
//     });
//   }
// }

//example from John's question period: "/www.youtube.com/watch?v=2rcudLdlzR4#t=1188"

// var wiki = "www.wiki.com/?params..."

// var wikiData = ko.observable(" ");

// $.ajax({
//     url: wiki
// }).success(function(response){
//         callback(response);
// });

// function callback(data){
//     var filteredData = data.filter(function(){
//             //do something to parse the response from api
//     });

//     wikiData(filteredData); // resets the bound view, etc.
// }


/////////////////KO VIEWMODEL///////////////////




var ViewModel = function () {
    var self = this;

    // Data
    self.spotList = ko.observableArray(model.spots);

    self.filterSlot = ko.observable();


    // Behaviours

    // TODO: user makes a selection to display Info Window from marker

    // selection can occur directly, ie, spotPick  ***DONE

    // or indirectly,  by text filtering the list down to one spot and pressing Enter ***DONE

    // or at any time by clicking the marker ***DONE

    self.spotPick = function () {
        console.log(this.name);
        for (var i in markers) {
            var marker = markers[i];
            if (marker.title == this.name)
                google.maps.event.trigger(marker, 'click');
        }
    };

    self.Selection = function () {
       console.log("Selector says:" + change);
    };

    self.isSelected = ko.observable(false);

    self.setFilterSelected = function() {
        this.isSelected(true);
    };

    // self.filterSlot = function(data, event) {
    //     console.log(data);
    //     console.log(event.keyCode);
    // }

    self.filterSlot.subscribe(function(data) {
        console.log(data);
        if (typeof infoWindow != 'undefined')
            infoWindow.close(); // unique opening
        self.spotList(filterList(data, model.spots));
        reSetMarkers(self.spotList(), map, markers);
    });

//     <input type="text"
//        data-bind="textInput : keyword,
//                   event: {keypress: onEnter}" >
// </input>

    // that.onEnter = function(d,e){
    //     e.keyCode === 13 && that.search();
    //     return true;
    // };

    self.onEnter = function(data,event) {
        // if (typeof infoWindow != 'undefined')
        //infoWindow.close(); // unique opening
        if (event.keyCode === 13) {
            console.log("Got an <enter> !!!");
            if (self.spotList().length === 1) {
                for (var i in markers) {
                    var marker = markers[i];
                    if (marker.title == self.spotList()[0].name)
                        google.maps.event.trigger(marker, 'click');
                }
            }
        }
        return true;
    }
};

ko.applyBindings(new ViewModel());

function filterList(userText, modelArray) {
     var result=[],
         re = new RegExp(userText, ['i']);

     modelArray.forEach( function(element, index, array) {
        //console.log(element.name);
        if (re.test(element.name)) result.push(element);
     });
     return result;
}




