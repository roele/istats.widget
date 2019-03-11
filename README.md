# iStats Widget

[![CircleCI](https://img.shields.io/circleci/project/github/roele/istats.widget/2.0-react.svg)](https://circleci.com/gh/roele/istats.widget/tree/2.0-react)
[![CodeCov](https://img.shields.io/codecov/c/github/roele/istats.widget/2.0-react.svg)](https://codecov.io/gh/roele/istats.widget)
[![Apache-2.0](https://img.shields.io/github/license/roele/istats.widget.svg)](https://github.com/roele/istats.widget/blob/master/LICENSE)

Made for [Übersicht](http://tracesof.net/uebersicht/).

Uses the [iStats Ruby Gem](https://github.com/Chris911/iStats "iStats") to obtain SMC information about your system.


## Installation

### Requirements & Installation

The widget requires the installation of the `iStats` Ruby gem to work. Installation of the gem requires
XCode Command Line Tools installed. Follow the steps outlined below to install the gem.

1. Open the Terminal.app
2. Issue the command `xcode-select --install`
3. Issue the command `sudo gem install iStats`
4. Issue the command `$(which istats)` and check for the output.
5. Done.


### Appearance & Options

You can find basic options in the file `index.jsx` in the top section defined as constant `cfg`.


* `top` or `bottom` Top or Bottom position in px
* `left` or `right` Left or Right position in px
* TBD


### Troubleshooting

* **The widget does not work and/or shows nothing**  
    * Verify the location of your istats binary by issuing `which istats` in your shell and adapt the `command` property in the `index.jsx` accordingly.
    * Open `Show Debug Console` to verify if there are errors shown in the `Console` tab. If so please report an issue to https://github.com/roele/istats.widget/issues with the error details.


### Credits

Icons by [WebHostingHub](http://www.webhostinghub.com/glyphs/)


### Support on Beerpay
Help me out for a couple of 🍻!

[![BeerPay](https://img.shields.io/beerpay/roele/istats.widget.svg)](https://beerpay.io/roele/istats.widget)
