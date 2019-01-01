# Coder's Calendar
![Coder's Calendar](http://i.imgur.com/PK58rhe.png)  
  
Browser extensions for competitive programming enthusiasts.
Shows a list of live & upcoming coding contests taking place in various popular competitive programming websites with the facility to add them to your google calender.
Currently shows updates from Codechef , HackerEarth , Hackerrank, Topcoder and Codeforces.

## ScreenShots  
  
![Home Screen](screenshots/cc-home.png) ![Settings Screen](screenshots/cc-settings.png)  
  
## Download  
Coder's Calendar is  available for download at:
- [Chrome Extension](https://chrome.google.com/webstore/detail/coders-calendar/bageaffklfkikjigoclfgengklfnidll). 

## Building locally
To install the dependencies, run
``` 
npm install 
```
from inside this directory.  
  
To run the extension, first run
```
npm run build
```
This will compile the react code inside `app/` to `build/chrome` & `build/firefox` respectievely.

### Installing in Chrome
 1. Navigate to chrome://extensions
 2. Select `Load unpacked extensions`
 3. Load the `build/chrome` folder


### Installing in Firefox
 1. Navigate to about:debugging
 2. Select `Load Temporary Add-on`
 3. Select any file from the `build/firefox` folder

## To-Do
 - [ ] Test Suite for the components
