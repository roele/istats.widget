iStats Widget
---

Made for [Übersicht](http://tracesof.net/uebersicht/)

Uses the [iStats Ruby Gem](https://github.com/Chris911/iStats "iStats") to obtain SMC information about your system.


## Requirements

The widget requires the installation of a Ruby Gem to work. Installation of the Gem requires
XCode Command Line Tools installed. Follow the steps to install the gem.

1. Open the Terminal.app
2. Issue the command `xcode-select --install`
2. Issue the command `sudo gem install iStats`
3. Issue the command `$(which istats)` and check for the output.
3. Done.


## Appearance & Options

You can find basic options in the file `index.js` in the top section `ui`. Some tweaks will require you to make
changes in the styles in the bottom section `style` of the file.

* `top` or `bottom` Top or Bottom position in px
* `left` or `right` Left or Right position in px
* `color` Donut chart color
* `bgcolor` Donut chart background color
* `width` Donut chart width in px, should be same as `height`
* `height` Donut chart height in px, should be same as `width`
* `radius` Donut chart radius in px, needs to be smaller than `width`/`height`
* `thickness` Donut chart line width in px
* `iconsize` Font size of the icons in px
* `iconheight` Line height of the icon font in px
* `fontsize` Font size of the labels in px


## Credits

Icons by [WebHostingHub](http://www.webhostinghub.com/glyphs/)
