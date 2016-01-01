


    // **Broadway-Commercial Station**

    // TRAINS - filter by line

    // BUSES - filter by direction EB, WB, NB, SB; filter by route no.

    // EATS - filter by food or beverage

    // SHOPS - filter by product categories

    // TO-DO - filter by adult, children])


// cat data:
var initialCats = [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568',
            nickNames: ['Bozo','Dozo','Fozo','Gozo'],
            levels: ['Newborn','Kitty','Mischief','Rogue','FatCat']
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904',
            nickNames: ['Bozer','Dozer','Fozer','Gozer'],
            levels: ['Newb','Kit','Miscreant','Pirate','Retiree']
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709',
            nickNames: ['Beezer','Deezer','Feezer','Geezer'],
            levels: ['Cutey','Putey','Scutey','Rutey','Futey']
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559',
            nickNames: ['Bozo','Dozo','Fozo','Gozo'],
            levels: ['Newborn','Kitty','Mischief','Rogue','FatCat']
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288',
            nickNames: ['Bozo','Dozo','Fozo','Gozo'],
            levels: ['Newborn','Kitty','Mischief','Rogue','FatCat']
        }
    ];

var Cat = function (data) { // data will be an (array of) object literal(s)
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttrib);
    this.nickNames = ko.observableArray(data.nickNames);
    this.levels = data.levels;
    this.catLevel = ko.computed( function () {
        var age = 0;
        age = Math.floor(this.clickCount() / 16);
        if (age >= this.levels.length) age = this.levels.length - 1;
        return this.levels[age];
    }, this);
}

var map;

// function initMap() {
//     var mapOptions = {
//         disableDefaultUI: true
//     };

//     // This next line makes `map` a new Google Map JavaScript Object and attaches it to
//     // <div id="map-box">, which is appended as part of an exercise late in the course.
//     map = new google.maps.Map(document.querySelector('#map-div'), mapOptions);
// }

function initMap() {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map-div'), {
        center: {lat: 49.263, lng: -123.0695},
        // Commercial Broadway Station 49°15′45″N, 123°04′08″W
        scrollwheel: false,
        zoom: 19 // tighter for transit
        //zoom: 18 // for eats etc
    });
}

var ViewModel = function () {
    var self = this;

    this.station = ko.observable("Broadway-Commercial");

    this.optList = ko.observableArray(["Trains","Buses","Eats","Shops","To Do"]);

    this.mapDisplay = ko.observable("display:none");


    this.catList = ko.observableArray([]);
    initialCats.forEach( function(catItem) {
        self.catList.push( new Cat(catItem) );
    });

    this.currentOpt = ko.observable( this.optList()[0] );

    this.incrementCounter = function () { // when this func is called on click binding
                                        // context is with:currentCat ie = this
                                        // so need to use self to pass ViewModel
                                        // OR ELSE:
                                        // this.clickCount(this.clickCount()+1);

        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };
    // this.incrementCounter = function () {
    //     this.clickCount(this.clickCount() + 1);
    // }
    this.changeCat = function (clickedCat) { self.currentCat(clickedCat) };

    this.changeOpt = function (clickedOpt) {
        self.currentOpt(clickedOpt);
        console.log("Option= " + self.currentOpt());
        self.mapDisplay("display:block");
        initMap();
    };

    this.menuReturn = function () {
        self.mapDisplay("display:none");
    }
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


