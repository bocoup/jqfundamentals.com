This is a repo for the eventual makeover of jqfundamentals.com. To fire up the
local server:

- make sure you have node installed
- run `npm install` from the repo root
- run `node server` or `supervisor server` to run the server at localhost:4444
- run `grunt requirejs` to build the JS for production
- run `NODE_ENV=production node server` to run the server in production mode

Hosting details are [here](https://github.com/bocoup/control.bocoup.com/wiki/jqfundamentals.com) -- tl;dr use [control.bocoup.com](http://control.bocoup.com) to update the production site. [production.jqfundamentals.bocoup.com](http://production.jqfundamentals.bocoup.com) is the staging site and updates automatically.