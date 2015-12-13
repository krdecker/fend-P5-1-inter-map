var Cat = function (data) { // data will be an (array of) object literal(s)
    this.clickCount = ko.observable(data.clicks);
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

    this.currentCat = ko.observable( new Cat(
            {
                clicks: 0,
                name: 'Tabby',
                imgSrc: 'img/434164568_fea0ad4013_z.jpg',
                imgAttrib: '',
                nickNames: ['Bozo','Dozo','Fozo','Gozo'],
                levels: ['Newborn','Kitty','Mischief','Rogue','FatCat']
            }
        ) );

    this.incrementCounter = function () { // when this func is called on click binding
                                        // context is with:currentCat ie = this
                                        // so need to use self to pass ViewModel
                                        // OR ELSE:
                                        // this.clickCount(this.clickCount()+1);
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    }
    // this.incrementCounter = function () {
    //     this.clickCount(this.clickCount() + 1);
    // }
}

ko.applyBindings(new ViewModel())