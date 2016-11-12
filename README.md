## Running the chrome extension
To install the dependencies, run
``` 
npm install 
```
from inside this directory.  
  
To run the extension, first run
```
npm run compile
```
This will compile the react code inside `app/` to `dist/js/index.js`  
Now from the extensions panel in Chrome,
 1. Select `Load unpacked extensions`
 2. Load the `dist/` folder


## To-Do
 - [x] Process and filter contests based on start/end time on client side
 - [x] Documentation for react setup
 - [x] Fix reload button
 - [x] Save and restore scroll position
 - [x] Handle case where ajax requrest to server fails
 - [ ] Test Suite for the components
