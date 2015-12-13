
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

var ViewModel = function () {
    var self = this;
    this.catList = ko.observableArray([]);
    initialCats.forEach(function(catItem) {
        self.catList.push( new Cat(catItem));
    });

    this.currentCat = ko.observable( this.catList()[0]);
    //console.log(this.currentCat().clickCount());
    this.incrementCounter = function () { // when this func is called on click binding
                                        // context is with:currentCat ie = this
                                        // so need to use self to pass ViewModel
                                        // OR ELSE:
                                        // this.clickCount(this.clickCount()+1);
        //console.log(self.currentCat().clickCount());
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    }
    // this.incrementCounter = function () {
    //     this.clickCount(this.clickCount() + 1);
    // }
    this.changeCat = function (cat) {
        self.currentCat(cat);
    }
}

ko.applyBindings(new ViewModel())