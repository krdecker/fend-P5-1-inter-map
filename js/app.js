var Cat = function () {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
    this.imgAttribution = ko.observable('');
    this.nickNames = ko.observableArray(['Bozo','Dozo','Fozo','Gozo']);
    this.level = [
            'Newborn',
            'Kitty',
            'Mischief',
            'Rogue',
            'FatCat'
        ];
    this.catLevel = ko.pureComputed( function () {
        var age = 0;
        age = Math.floor(this.clickCount() / 16);
        if (age >= this.level.length) age = this.level.length - 1;
        return this.level[age];
    }, this);
}

var ViewModel = function () {
    this.incrementCounter = function () {
        this.clickCount(this.clickCount() + 1);
    }
}

ko.applyBindings(new ViewModel())