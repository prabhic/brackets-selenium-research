(Note: Brackets interally have a unit and integration test system. This can be used both to test Extensions and Core Brackets)
This project is a output of quick technical research on using Selenium test framework to test Brackets/Extensions E2E funtionality.(In case if we need this ..) 

# Analysis Output:

It is possible to test Brackets using selenium WebDriverJS API.
   - As Brackets uses 9234 fixed debug port. Either we have to compile Brackets shell to consider  --remote-debugging-port option or ChromeDriver needs to be built to use 9234 port to communicate (compiled mac binary can be found in this repo).
   - To Access Native FileSystem Explorer and any other Brackets internal functions, easiest way is to use driver.executeScript() for example below statement can be used to open project, browser.driver.executeScript('brackets.test.ProjectManager.openProject("testpath");');
   - Communication flow of test case is  shown below,
      Jasmine Test -> WebDriverJS (selenium-webdriver) ->  chromedriver -> Brackets
     Protractor is a wrapper around WebDriverJS, it is not mandatory to use this, as a lot of functioanly is only valid for angular. But as a POC, protractor is used and conf-poc.js test can be found in repo. spec-poc.js tests the functionaltiy to open a  project and file.

Considering we already have integration test system built in Brackets, Whether using selenium/WebDriverJS API has any advantage is a question.   

#Steps (On Mac)
1. Install Brackets (http://brackets.io/)
2. $npm install -g protractor 
3. Check out this repo
4. $ protractor conf-poc.js


# Details
[Protractor] (https://github.com/angular/protractor) is a wrapper built on top of [WebDriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs) of slenium. It is a E2E test framework mainly built for AngularJS applications but can also be used for non-angular apps. [ChromeDriver] (https://code.google.com/p/selenium/wiki/ChromeDriver) is a standalone server which implements [WebDriver's wire protocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol) for Chromium. ChromeDriver uses devtools protocol to communicate Browser.

Brackets uses remote debug port 9234 hardcoded internally. Where as chromedriver everytime generates new available port and asks Browser(in out case Brackets) to use this port using --remote-debugging-port option when starting Brackets binary. By running protractor test, chromedriver launches Brackets but not able to communicate with it. We can pass "RemoteDebugging:port" option to chromedriver using ChromeOptions of protractor config file. But in this case ChromeDriver assumes Browser is already launched it has to just connect using port, so it doens't launch the Brackets. 

I have compiled ChromeDriver for MAC by hardcoding 9234 port to communicate with browser by changing below files, 
   https://chromium.googlesource.com/chromium/src.git/+/master/chrome/test/chromedriver/net/port_server.cc
   FindAvailablePort to 
      uint16 PortManager::FindAvailablePort() const {
        return 9234; //TMP Fix to work with Brackets
You can find the compiled ChromeDriver in this repo.



