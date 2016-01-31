




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
            name: "Uncle Fatih's Pizza",
            location: {lat: 49.262487, lng: -123.070000} //was .262517 .070177
        },
        // foursquare search choked on this; went to YVR instead
        // {
        //     name: "A&W Restaurant",
        //     location: {lat: 49.262535, lng: -123.069399}
        // },
        {
            name: "Buddha's Orient Express",
            location: {lat: 49.262719, lng: -123.069289}
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

var map, markers;
var infowindow;
// = new google.maps.InfoWindow({
    // content: '<div id="info" style='
    //             + '"height:90px;width:400px;font-size:36pt;color:red;opacity:.6">'
    //             + '<p>' + marker.title + '</p>'
    //             + '</div>'
 //       content: ""
 //   });

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
                  { visibility: "off"}
            ]
        }
      ];

var RedRoadsNGreenBusStops = [
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
        { visibility: "off" }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      { "gamma": 0.65 },
      { "hue": "#ff9c30" },
      { "visibility": "on" },
      { "saturation": 99 },
      { "lightness": -12 }
    ]
  },{
    "featureType": "transit",
    "stylers": [
      { "hue": "#00ff33" },
      { "gamma": 0.60 },
      { "saturation": 5 },
      { "visibility": "on" },
      { "weight": 4.6 },
      { "lightness": -12 } //was -22
    ]
  }
];

var mapOptions = {
        center: {lat: 49.263, lng: -123.0695},
        // Commercial Broadway Station 49°15′45″N, 123°04′08″W
        scrollwheel: false,
        zoom: 19, // tighter for transit
        //zoom: 18 // for eats etc
        //maxZoom: 19,
        //minZoom: 19,
        zoomControl: false,
        scrollwheel: false,
        draggable: false,
        disableDoubleClickZoom: true,
        disableDefaultUI: true,
        styles: RedRoadsNGreenBusStops
    }




// INFO WINDOW DEF
// this will eventually contain info return by Ajax calls to APIs

    // load streetview
// var streetviewUrl = '';
// var picture = '';

//var css = '"height:100%;width:100%;font-size:4em;color:blue;background-color:orange;padding:5px"';
// var css = '';
// var infoContent = '';

function NoMap() {
    alert("Google Map is unavailable just now.\n"
        + "But info on Eats around the station \n"
        + " is still listed. Click on the list.");
}

function initMap() {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map-div'), mapOptions );
    markers = [];
    infowindow = new google.maps.InfoWindow({});

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

        if (i==0) offset = {x:100, y:-108};
        else offset = {x:0, y:-108};

        marker = getMarker(offset, spot.location, spot.name, map);
        markers.push(marker);
    }
    // fine tune:
    //markers[0].anchorPoint.set(x, -20);
}


function stealClick_ (e) {
  e.stopPropagation();
}

// google.maps.event.addDomListener(closeImg, 'click', removeInfoBox(this));
// google.maps.event.addDomListener(contentDiv, 'mousedown', stealClick_);



function getMarker (offset, location, name, map) {
    var markColor = "4f6fcf";

    var marker = new google.maps.Marker({
        anchorPoint: offset,
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




    // streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + marker.position.toString() + '';
    // picture = '<img class="bgimg" src="' + streetviewUrl + '">';
    // console.log(marker.position.toString());
    //var css = '"height:100%;width:100%;font-size:4em;color:blue;background-color:orange;padding:5px"';
    // css = '"height:100%;width:100%"';
    // infoContent = '<div style=' + css + '><strong>' + picture + '</strong></div>';


// add Bounce & an Info Window on click event
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

    //         var bounceError = marker.setAnimation(google.maps.Animation.BOUNCE);
    //         if (! bounceError) {
    //             setTimeout( function() {
    //                 marker.setAnimation(null);
    //                 openAPIslide(marker.title);
    //             }, 1200);
    //         }
    //  });
    //attachWindow(marker); // tried separate listeners
    attachBouncer(marker);
    return marker;
}


// function attachBouncer(marker) {
//     google.maps.event.addListener(marker, "click", function() {
//         marker.setAnimation(google.maps.Animation.BOUNCE);
//         console.log("in bouncer, after click: on marker " + marker.title );
        // setTimeout( function() {
        //             marker.setAnimation(null);
        //         }, 1200);
//     });
// }

function attachBouncer(marker) {
    var clickEvent = google.maps.event.addListener(marker, "click", doBounce);

    function doBounce() {
        google.maps.event.removeListener(clickEvent);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        console.log("in doBounce: have set the BOUNCE");
        window.setTimeout( function() {
            clickEvent = google.maps.event.addListener(marker, "click", doBounce);
            marker.setAnimation(null);
            console.log("in doBounce: have set the NULL");
            //vm.openAPIslide(marker.title);
        }, 6000);
        console.log("in doBounce: about to call to open window");
        openWindow(marker);
    }
}


// var infoContent = "<p>" + marker.title + "</p><p>" + marker.position.toString() + "</p>";
// var css = '"height:200px;width:400px;font-size:36pt;color:red;opacity:.6"';
// var infoContentBox = '<div id="info" style=' + css + '>' + infoContent + '</div>;'

// function attachWindow(marker) {
//   var infowindow = new google.maps.InfoWindow({
//     content: '<div id="info" style='
//                 + '"height:90px;width:400px;font-size:36pt;color:red;opacity:.6">'
//                 + '<p>' + marker.title + '</p>'
//                 + '</div>'//,
//     //zIndex: 101
//   });

//   marker.addListener('click', function() {
//     //if (openInfoWindow) openInfoWindow.close();
//     infowindow.open(marker.get('map'), marker);
//     console.log("just opened window");
//     //openAPIslide(marker.title);
//   });
// }

function openWindow(marker) {
    var content;

    if (infowindow) infowindow.close();
    content = buildContent(marker);

    if (content) infowindow.setContent(content);

    infowindow.open(marker.get('map'), marker);
    console.log("In openWindow: just opened window");
}


// reluctantly including an onclick DOM global event attribute in the
//  <img> element of the infowindow
// after giving up on adding a listener to the infowindow
// due to time constraints
// TODO: try to do a ko binding on the infowindow DOM node

function buildContent(marker) {

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=400x300&location=' + marker.position.toString() + '';
    var picture = '<img class="bgimg" src="' + streetviewUrl + '">';
    console.log("In buildContent: " + marker.position.toString());
    //var css = '"height:100%;width:100%;font-size:4em;color:blue;background-color:orange;padding:5px"';
    var css = '"height:100%;width:100%"';
    var content = '<div onclick="itchwindow()" style=' + css + '>' + picture + '</div>';

    return content;
}

function itchwindow() {
    console.log("Ouch!!!");
    console.log(infowindow.anchor.title);
    vm.openAPIslide(infowindow.anchor.title);
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


/////////////////KO VIEWMODEL///////////////////




var ViewModel = function () {
    var self = this;

    // Data
    self.slideOn = ko.observable(false);
    self.slideContent = ko.observable("");
    self.spotList = ko.observableArray(model.spots);

    self.filterSlot = ko.observable();


    // Behaviours

    self.spotPick = function () {
        console.log(this.name);
        for (var i in markers) {
            var marker = markers[i];
            if (marker.title == this.name)
                google.maps.event.trigger(marker, 'click');
        }
    };

    self.isSelected = ko.observable(false);

    self.setFilterSelected = function() {
        this.isSelected(true);
        self.slideOff();
    };

    self.filterSlot.subscribe(function(data) {
        console.log(data);
        if (infowindow) infowindow.close();
        self.spotList(filterList(data, model.spots));
        reSetMarkers(self.spotList(), map, markers);
    });

    self.onEnter = function (data,event) {
        if (infowindow) infowindow.close();
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

//interface to API AJAX system

    self.openAPIslide = function (spotName) {
        console.log("In openAPIslide with: " + spotName);

        //var slideString =
        var ajax_error = buildSlideContent(spotName);
        //console.log(slideString);

        //self.slideContent(slideString);

        if (ajax_error) self.slideContent(ajax_error);

        self.slideOn(true);
    }

    self.slideOff = function () {

        this.slideOn(false);
    }

};

var vm = new ViewModel();
ko.applyBindings(vm);


//-----------------------------------------------
// helper func: regular expression
function filterList(userText, modelArray) {
     var result=[],
         re = new RegExp(userText, ['i']);

     modelArray.forEach( function(element, index, array) {
        //console.log(element.name);
        if (re.test(element.name)) result.push(element);
     });
     return result;
}

function getLocationAsLLString(spotName, model) {
    var result = "ll=";

    for (i in model.spots) {
        var spot = model.spots[i];
        if (spot.name == spotName) {
            result += spot.location.lat.toString() + ',' + spot.location.lng.toString();
        }
    }

    return result;
}

//==========================================================
// 3rd party API stuff

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



var fourSquareURL = 'https://api.foursquare.com';


function buildSlideContent(spotName) {
    var formattedData = "";
    var loc = getLocationAsLLString(spotName, EatsModel);
    var ajax_error;
    console.log(loc);

    $.ajax({ // to get the foursquare ID number of the venue
            url: fourSquareURL + '/v2/venues/search',
            dataType: 'json',
            data: 'limit=1' +
                    '&' + loc + //'ll=45.5590561,-122.6447018' +
                    '&query=' + spotName +
                    '&client_id='+ kr.foursquare.Client_id +
                    '&client_secret='+ kr.foursquare.Client_secret +
                    '&v=20160130',
            async: true,
            //success: ,
            error: sendError
    }).success(function(response){
          nextcall(response);
        });


    function nextcall(data) {
        var venue = data.response.venues[0];
        //https://api.foursquare.com/v2/venues/VENUE_ID
        $.ajax({ // to get the detailed foursquare of the 'complete venue' based on ID
            url: fourSquareURL + '/v2/venues/' + venue.id,
            dataType: 'json',
            data: 'limit=1' +
                    '&' + loc + //'ll=45.5590561,-122.6447018' +
                    '&query=' + spotName +
                    '&client_id='+ kr.foursquare.Client_id +
                    '&client_secret='+ kr.foursquare.Client_secret +
                    '&v=20160130',
            async: true,
            //success: ,
            error: sendError
    }).success(function(response){
          callback(response);
        });

    }

    function callback(data){
        console.log(data);
        var venue = data.response.venue;

        console.log(venue.name);
            formattedData = 'FourSquare info: '
                                + '<br>' + '<br>' + venue.name + '<br>'
                                + venue.contact.formattedPhone + '<br>'
            + 'address: ' + venue.location.address + '<br>'
            + 'city: ' + venue.location.city  + '<br>'
            + 'country: ' + venue.location.country  + '<br>'
            + 'crossStreet: ' + venue.location.crossStreet + '<br>'
            + 'Check-ins: ' + venue.stats.checkinsCount.toString() + '<br>'
            + venue.likes.summary + '<br>' + '<br>'
            + '<span style="background-color:#' + venue.ratingColor + ';color:black;padding:1%">'
            + 'Rating: ' + venue.rating.toString() + '</span>' + '<br>'

             ;

        vm.slideContent(formattedData);
    }

    function sendError(object, error, exception) {
        ajax_error = "Web call failed: " + error ;
    }

    return ajax_error;


    //return "Ratings for:  " + spotName + "\n" + loc;
}



//from https://developer.foursquare.com/overview/auth#userless
//https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD

//foursquare.com/v/broadway-station-sushi/4aae9cb7f964a5209b6220e3


var kr = {
    foursquare: {
        Owner: "KR Decker",
        Client_id: "ZVLKTKSGULFEQ3XMWWI3AL1A2KXYBEKD1LKSURUZDGZY41JX",
        Client_secret: "TMT203DHWOPR3R4RSM1HE4RMOKEWLGTT0FLMZMUZ1OJHMAK1"
    },
    yelp: {
        Consumer_Key:    "XrxJOUgGNKq9ZuWhBX1LDw",
        Consumer_Secret: "zr2I76nT8l0O-trkupYE00B9BTA",
        Token:   "-_F8aOxonR6q5SqvURwwgLIdU-qteS-B",
        Token_Secret:    "GF7uRcPWCpzlHcRP3DiJWjvcXJE"
    }
}

