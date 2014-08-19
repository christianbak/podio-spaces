#A simple selector demo for picking a work space in Podio.

In order to build the optimized sample application, you need to have node installed as well as grunt and bower.

Clone form Github:
```
git clone https://github.com/christianbak/podio-spaces.git && cd podio-spaces
```

Install grunt tasks and other npm dependencies
```
npm install
```

Install browser dependencies
```
bower install
```

Build the optimized application
```
grunt
```

To run the optimized application, just open the file **built.html**.

To view the development version, open **index.html**. The development version is a bit slower, but does not need to be built after changes. It also needs to be run through a simple webserver to work in chrome.
