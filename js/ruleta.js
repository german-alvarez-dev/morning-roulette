window.onload = () => {
    document.body.classList.add('visible')
    setTimeout(() => loading.style.display = 'none', 500)
}

var RouletteWheel = function (el, items) {
    this.$el = $(el);
    this.items = items || [];
    this._bis = false;
    this._angle = 0;
    this._index = 0;
    this.options = {
        angleOffset: -90
    }
}
var modalResult, modalSelect, squadButtons, datasquad, spinner, data

_.extend(RouletteWheel.prototype, Backbone.Events);

RouletteWheel.prototype.spin = function (_index) {

    var count = this.items.length;
    var delta = 360 / count;

    var index = parseInt(Math.random() * count);

    console.log(index)

    var a = index * delta + ((this._bis) ? 1440 : -1440);

    // a+=this.options.angleOffset;

    this._bis = !this._bis;
    this._angle = a;
    this._index = index;

    var $spinner = $(this.$el.find('.spinner'));

    var _onAnimationBegin = function () {
        this.$el.addClass('busy');
        this.trigger('spin:start', this);
    }

    var _onAnimationComplete = function () {
        this.$el.removeClass('busy');
        this.trigger('spin:end', this);
    }

    $spinner
        .velocity('stop')
        .velocity({
            rotateZ: a + 'deg'
        }, {
            easing: 'easeIn',
            duration: 11000,
            begin: $.proxy(_onAnimationBegin, this),
            complete: $.proxy(_onAnimationComplete, this)
        });
}

RouletteWheel.prototype.render = function () {

    var $spinner = $(this.$el.find('.spinner'));
    var D = this.$el.width();
    var R = D * .5;

    var count = this.items.length;
    var delta = 360 / count;

    for (var i = 0; i < count; i++) {

        var item = this.items[i];

        var color = item.color;
        var text = item.text;
        var ikon = item.ikon;

        var html = [];
        html.push('<div class="item" ');
        html.push('data-index="' + i + '" ');
        html.push('data-type="' + item.type + '" ');
        html.push('>');
        html.push('<span class="label">');
        if (ikon)
            html.push('<i class="material-icons">' + ikon + '</i>');
        html.push('<span class="text">' + text + '</span>');
        html.push('</span>');
        html.push('</div>');

        var $item = $(html.join(''));

        var borderTopWidth = D + D * 0.0025; //0.0025 extra :D
        var deltaInRadians = delta * Math.PI / 180;
        var borderRightWidth = D / (1 / Math.tan(deltaInRadians));

        var r = delta * (count - i) + this.options.angleOffset - delta * .5;

        $item.css({
            borderTopWidth: borderTopWidth,
            borderRightWidth: borderRightWidth,
            transform: 'scale(2) rotate(' + r + 'deg)',
            borderTopColor: color
        })

        var textHeight = parseInt(((2 * Math.PI * R) / count) * .5);

        $item.find('.label').css({
            //transform: 'translateX('+ (textHeight) +'px) translateY('+  (-1 * R) +'px) rotateZ('+ (90 + delta*.5) +'deg)',
            transform: 'translateY(' + (D * -.25) + 'px) translateX(' + (textHeight * 1.03) + 'px) rotateZ(' + (90 + delta * .5) + 'deg)',
            height: textHeight + 'px',
            lineHeight: textHeight + 'px',
            textIndent: (R * .1) + 'px'
        });

        $spinner.append($item);
    }

    $spinner.css({
        fontSize: parseInt(R * 0.06) + 'px'
    })

    //this.renderMarker();


}

RouletteWheel.prototype.renderMarker = function () {

    var $markers = $(this.$el.find('.markers'));
    var D = this.$el.width();
    var R = D * .5;

    var count = this.items.length;
    var delta = 360 / count;

    var borderTopWidth = D + D * 0.0025; //0.0025 extra :D
    var deltaInRadians = delta * Math.PI / 180;
    var borderRightWidth = (D / (1 / Math.tan(deltaInRadians)));

    var i = 0;
    var $markerA = $('<div class="marker">');
    var $markerB = $('<div class="marker">');

    var rA = delta * (count - i - 1) - delta * .5 + this.options.angleOffset;
    var rB = delta * (count - i + 1) - delta * .5 + this.options.angleOffset;

    $markerA.css({
        borderTopWidth: borderTopWidth,
        borderRightWidth: borderRightWidth,
        transform: 'scale(2) rotate(' + rA + 'deg)',
        borderTopColor: '#FFF'
    });
    $markerB.css({
        borderTopWidth: borderTopWidth,
        borderRightWidth: borderRightWidth,
        transform: 'scale(2) rotate(' + rB + 'deg)',
        borderTopColor: '#FFF'
    })

    $markers.append($markerA);
    $markers.append($markerB);
}

RouletteWheel.prototype.bindEvents = () => document.querySelector('.button').onclick = () => spinner.spin()

$(window).ready(() => {

    spinner = new RouletteWheel($('.roulette'), content.web);
    spinner.render();
    spinner.bindEvents();

    spinner.on('spin:start', startSpin)
    spinner.on('spin:end', function (r) {
        data = content['web']
        document.querySelector('h1').innerHTML = '<span class="blink">¡Buenos días ' + data[r._index].text + '!</span>'
    })
})

var audio = new Audio('ruleta-sound.mp3');


function startSpin() {
    audio.play()
}