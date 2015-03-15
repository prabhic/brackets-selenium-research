(Note: Brackets interally have a unit and integration test system. This can be used both to test Extensions and Core Brackets)

This project is a output of quick technical research on using Selenium test framework to test Brackets/Extensions E2E funtionality.(In case if we need this ..) 

# Using Protractor + chromedriver 
[Protractor] (https://github.com/angular/protractor) is a wrapper built on top of [WebDriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs) of slenium. It is a E2E test framework mainly built for AngularJS applications but can also be used for non-angular apps. [ChromeDriver] (https://code.google.com/p/selenium/wiki/ChromeDriver) is a standalone server which implements [WebDriver's wire protocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol) for Chromium. ChromeDriver uses devtools protocol to communicate Browser.

Brackets uses remote debug port 9234 hardcoded internally. Where as chromedriver everytime generates new available port and asks Browser(in out case Brackets) to use this port using --remote-debugging-port option when starting Brackets binary. By running protractor test, chromedriver launches Brackets but not able to communicate with it. We can pass "RemoteDebugging:port" option to chromedriver using ChromeOptions of protractor config file. But in this case ChromeDriver assumes Browser is already launched it has to just connect using port, so it doens't launch the Brackets. 

I have compiled ChromeDriver for MAC by hardcoding 9234 port to communicate with browser by changing below files, 
   https://chromium.googlesource.com/chromium/src.git/+/master/chrome/test/chromedriver/net/port_server.cc
   FindAvailablePort to 
      uint16 PortManager::FindAvailablePort() const {
        return 9234; //TMP Fix to work with Brackets

You can find the compiled ChromeDriver in this repo.

#Steps (On Mac)
1. Install Brackets
2. Install Protractor 
3. Check out this repo
4. $ protractor ./conf-sample.js

With this you can see that we can test basic test cases on the Brackets Shell.

#Issues

4. $ protractor ./conf-project.js

In conf-project.js I want to open a test project, to do further test on that. You can see that openFile dialog is open. 
Now i am not sure how to pass project folder to brackets FileSystem file dialog. Further reaserach needs to be done on this.



