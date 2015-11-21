iStats Widget
---

Made for [Übersicht](http://tracesof.net/uebersicht/)

Uses the [iStats Ruby Gem](https://github.com/Chris911/iStats "iStats") to obtain SMC information about your system.


## Requirements

As already mentioned the widget requires the installation of a Ruby Gem to work. Follow the following steps
to install the gem.

1. Open the Terminal.app
2. Issue the command `sudo gem install iStats`
3. Issue the command `istats` and check for the output.
3. Done.


## Appearance & Options

You can find basic options in the file `index.js` in the top section `ui`. Some tweaks will require you to make
changes in the styles in the bottom section `style` of the file.

* `top` Top position
* `left` Left position
* `color` Donut chart color
* `bgcolor` Donut chart background color
* `width` Donut chart width, should be same as `height`
* `height` Donut chart height, should be same as `width`
* `radius` Donut chart radius, needs to be smaller than `width`/`height`
* `thickness` Donut chart line width
* `iconsize` Font size of the icons in rem
* `iconheight` Line height of the icon font in rem
* `displaylabel` Label display property (e.g 'block' or 'none')
* `fontsize` Font size of the labels in rem


## Credits

Icons by [WebHostingHub](http://www.webhostinghub.com/glyphs/)
