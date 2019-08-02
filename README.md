# iStats Widget

[![CircleCI](https://img.shields.io/circleci/project/github/roele/istats.widget/master.svg)](https://circleci.com/gh/roele/istats.widget/tree/master)
[![CodeCov](https://img.shields.io/codecov/c/github/roele/istats.widget/master.svg)](https://codecov.io/gh/roele/istats.widget)
[![Apache-2.0](https://img.shields.io/github/license/roele/istats.widget.svg)](https://github.com/roele/istats.widget/blob/master/LICENSE)

Made for [Übersicht](http://tracesof.net/uebersicht/).

Uses the [iStats Ruby Gem](https://github.com/Chris911/iStats "iStats") to obtain SMC information about your system.

![](screenshot.png)

## Installation

### Prerequisites

The widget requires the installation of the `iStats` Ruby gem to work. Installation of the gem requires
XCode Command Line Tools installed. Follow the steps outlined below to install the gem.

1. Open the Terminal.app
2. Issue the command `xcode-select --install`
3. Issue the command `sudo gem install iStats`
4. Issue the command `$(which istats)` and check for the output.

### Widget installation
To install the widget, extract the `istats.widget.zip` in your Übersicht widget folder (also see Übersicht > Preferences).

The final result should look similar to following.

    .
    ..
    getting-started.coffee
    istats.widget
    übersicht-logo.png


### Widget configuration

Sone basic configuration options can be found in the file `index.jsx` in the top section defined as constant `config`.


* `stats` - Array of stat keys in rendering order (e.g. `['cpu','fan-0','fan-1','battery']`)  
    Available keys:  
    * `cpu` - CPU stats
    * `fan-N` - Fan #N stats
    * `battery` - Battery stats
* `tempUnit` - CPU temperature unit, either `C` (Celsius) or `F` (Fahrenheit)
* `top` - Top position in px (e.g. `100px`)
* `left` - Left position in px (e.g. `100px`)
* `animations` - Icon animations flag, either `true` or `false`
* `width` - Stat donut chart width in px (e.g. `74`)
* `height` - Stat donut chart height in px (e.g. `40`)
* `radius` - Stats donut chart radius in px (e.g. `18`)
* `strokeWidth` - Stat donut chart stroke width in px (e.g. `2`)
* `color` - Stat color (e.g. `#666`)
* `iconSize` - Stat icon size (e.g. `1.0rem`)
* `iconLineHeight` - Stat icon line height (e.g. `2.5rem`)
* `labelSize` - Stat label font size (e.g. `0.625rem`)


### Troubleshooting

* **The widget does not work and/or shows nothing**
    * Verify the location of your istats binary by issuing `which istats` in your shell and adapt the `command` property in the `index.jsx` accordingly.
    * Open `Show Debug Console` to verify if there are errors shown in the `Console` tab. If so please report an issue to https://github.com/roele/istats.widget/issues with the error details.


### Credits

Icons by [WebHostingHub](http://www.webhostinghub.com/glyphs/)


### Support on Beerpay
Help me out for a couple of 🍻!

[![BeerPay](https://img.shields.io/beerpay/roele/istats.widget.svg)](https://beerpay.io/roele/istats.widget)
