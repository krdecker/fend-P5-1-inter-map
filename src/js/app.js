




///////////////////MODEL///////////////////////

//get & hold various chunks of data
// json objects returned from apis
// lists of sites on each map-view

// trains data: ???
var TrainsModel = {
    zoomLevel: 19,
    center: {lat: 49.262219, lng: -123.069252},
    spots: [
        {
            name: "Skytrain Platform 3 & 4",
            location: {lat: 49.261905, lng: -123.069172}
        },
        {
            name: "Skytrain Platform 2",
            location: {lat: 49.262980, lng: -123.068477}
        }
    ]
};

// buses data:
var BusesModel = {
    zoomLevel: 19,
    center: {lat: 49.262252, lng: -123.069801},
    spots: [
        {
            name: "WB E Broadway NS Commercial Bay 1",
            location: {lat: 49.262437, lng: -123.069420}
        },
        {
            name: "EB E Broadway FS Commercial Dr",
            location: {lat: 49.262216, lng: -123.068957}
        }

    ]
};

// eats data: an array of places
var EatsModel = {
    zoomLevel: 20,
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
        }
    ]
};

// shops data:
var ShopsModel = {
    zoomLevel: 17,
    spots: [
        {
            name: "Shopper's Drug Mart",
            location: {lat: 49.262576, lng: -123.068751}
        },
        {
            name: "Bank of Montreal",
            location: {lat: 49.262156, lng: -123.070113},
        }
    ]
};

// todo data:
var TodoModel = {
    zoomLevel: 16,
    spots: [
        {
            name: "Rio Cinema On Broadway",
            location: {lat: 49.262039, lng: -123.070509}
        },
        {
            name: "Tung Lin Kok Yuen Society Buddhist Temple",
            location: {lat: 49.262642, lng: -123.066175}
        },
        {
            name: "Daralmadinah Society Mosque",
            location: {lat: 49.261643, lng: -123.070592}
        },
        {
            name: "Community Garden Walk",
            location: {lat: 49.259850, lng: -123.069303}
        },
        {
            name: "Trout Lake",
            location: {lat: 49.257151, lng: -123.064527}
        },
        {
            name: "St.Augustine's Local Beer Pub",
            location: {lat: 49.263781, lng: -123.069252}
        }

    ]
};

//// mini-Router
var optionModels = [
        { name: "Trains", model: TrainsModel },
        { name: "Buses", model: BusesModel },
        { name: "Eats", model: EatsModel },
        { name: "Shops", model: ShopsModel },
        { name: "To Do", model: TodoModel }
];

///////////////MAP API VIEWMODEL///////////////////////////

var map;

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

// function initMap() {
//     var mapOptions = {
//         disableDefaultUI: true
//     };

//     // This next line makes `map` a new Google Map JavaScript Object and attaches it to
//     // <div id="map-box">, which is appended as part of an exercise late in the course.
//     map = new google.maps.Map(document.querySelector('#map-div'), mapOptions);
// }
var markers = [],
    infoWindow;

function initMap() {
    console.log("In initMap");
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map-div'), mapOptions );
}

function resetMap(model) {
    //console.log("In resetMap: " + model.zoomLevel);

    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map-div'), mapOptions );

    map.setZoom(model.zoomLevel);
    map.setCenter(model.center);

    for (var i in model.spots) {
        var spot = model.spots[i];
        //console.log(spot.name);
        var marker = getMarker(spot.location, spot.name, map);
        markers.push(marker);
    }

    function getMarker (location, name, map) {
        var marker = new google.maps.Marker({
            position: location,
            title: spot.name,
            map: map
        });
        // add an Info Window on click event
        google.maps.event.addListener(marker, 'click', function() {
            if (typeof infoWindow != 'undefined') infoWindow.close(); // unique opening
            infoWindow = new google.maps.InfoWindow({
                content: name // TODO change this to <img src=''>
            });
            infoWindow.open(map, marker);
        });
        return marker;
    }


}
/////////////////KO VIEWMODEL///////////////////

var optionData; // global to pass pointer to data object


var ViewModel = function () {
    var self = this;

    // Data

    // can data bind on 'constants'; don't need the overhead of an .observable
    self.station = "Broadway-Commercial"; //ko.observable("Broadway-Commercial");
    self.optList = ["Trains","Buses","Eats","Shops","To Do"]; //ko.observableArray(["Trains","Buses","Eats","Shops","To Do"]);
    self.spotList = ko.observableArray([]);
    self.safeSpotList = [];
    self.choice = ko.observable();
    self.mapDisplay = ko.observable("display:none");
    self.menuDisplay = ko.observable("display:block");
    self.selectSlot = ko.observable();


    // Behaviours

    self.changeOpt = function (clickedOpt) {

        //console.log("Option= " + clickedOpt);

        for (var i in optionModels){
            //console.log(optionModels[i].name);
            if (optionModels[i].name == clickedOpt) {
                optionData = optionModels[i].model;
            }
        };

        self.menuDisplay("display:none");
        self.mapDisplay("display:block");
        //console.log(optionData.zoomLevel);
        resetMap(optionData);
        //initMap();
        self.buildSpotlist(optionData);

    };

    // bound to appropriate DOM elements
    self.menuReturn = function () {
        self.mapDisplay("display:none");
        self.menuDisplay("display:block");
    };

    self.buildSpotlist = function(model){
        //console.log("Building Spotlist from: data object");
        //console.log("spotList start ");
        //console.log("eg: " + model.spots[0].name);

        // initialise observableArray with array from the model data
        self.spotList(model.spots);
        self.safeSpotList = self.spotList();
    };

    self.Selection = function () {
        console.log("Selector says:" + change);
    };

    self.spotPick = function () {
        console.log(this.name);
    };

    self.isSelected = ko.observable(false);
    self.setFilterSelected = function() {
        this.isSelected(true);

    };

    self.selectSlot.subscribe(function(data) {
        console.log(data);
    });

 // personVM.name.subscribe(function(newValue) {
 //            console.log("The person's new name is " + newValue);
 //        });
    // self.filterSpotlist = ko.computed (function () {
    //     self.spotList(self.safeSpotList) // re-set list
    //     console.log(self.spotList());
    //     console.log(self.selectSlot());
    //     self.spotList( siftText( self.selectSlot() ) );

    //     function siftText(inputvalue) {
    //         var re = new RegExp(inputvalue, ['i']);
    //         var temp = [];

    //         self.spotList().forEach(function(element,index,array) {
    //             if (re.test(element.name)) {
    //                 temp.push(element);
    //                 console.log("and " + element.name);
    //             }
    //         });
    //         return temp;
    //     }
    // });

    // self.inFilteredSpots = ko.computed( function () {
    //     //check membership of list item in the filtered array
    //     if (self.filteredSpots().indexOf(this) = -1) return false;
    //     return true;
    // });

    // maybe try data-bind="visible: filteredSpots.indexOf(this) > -1"
};

ko.applyBindings(new ViewModel())

//initMap()

// from ISS API website: (maybe useful for translink api)

// $.getJSON('http://api.open-notify.org/iss-pass.json?lat=45.0&lon=-122.3&alt=20&n=5&callback=?', function(data) {
//     data['response'].forEach(function (d) {
//         var date = new Date(d['risetime']*1000);
//          $('#isspass').append('<li>' + date.toString() + '</li>');
//     });
// });

// $.getJSON('http://api.open-notify.org/astros.json?callback=?', function(data) {
//     var number = data['number'];
//     $('#spacepeeps').html(number);

//     data['people'].forEach(function (d) {
//          $('#astronames').append('<li>' + d['name'] + '</li>');
//     });
// });


