var fs = require('fs')

describe("poc-tests", function () {
        var testPath = fs.realpathSync("./test-project");
        console.log(testPath);
        browser.driver.sleep(10000); //to load
        browser.ignoreSynchronization = true;


        describe("openproject", function () {
            it("should open project and check for name", function () {
                var cmd = 'brackets.test.ProjectManager.openProject("' +testPath + '");';
                console.log(cmd);
                browser.driver.executeScript(cmd);


                 var greeting = element(by.id('project-title'));

                 console.log(greeting.getInnerHtml());

                var prom = browser.driver.findElement(By.id('project-title')).getInnerHtml();

                prom.then(function (title) {
                    projectTitle = title;
                    console.log(projectTitle);
                    expect(projectTitle).toEqual("test-project");
                });

            });

            it("should open file and check for contents", function () {
                var x = browser.driver.findElement(By.css('#project-files-container .jstree-leaf')).click();
                console.log("clicked");

                var prom = browser.driver.findElement(By.css('#editor-holder .CodeMirror-code')).getInnerHtml();

                browser.driver.sleep(2000); //to load

                prom.then(function (content) {
                    console.log(content);
                    expect(content).toContain("HTML5 Boilerplate");
                });

            });
        });
    });