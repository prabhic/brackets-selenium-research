// spec.js
describe('project test', function() {
  it('open default project', function() {

  	browser.driver.sleep(4000); //to load
  	browser.ignoreSynchronization = true;

	element(by.id('project-dropdown-toggle')).click();
	browser.driver.sleep(2000);

	var browsButton = element(by.id('open-folder-link'));
	var actions = browser.driver.actions();
	actions.mouseMove(browsButton);
	actions.click();

	actions.sendKeys("/Users/prabhank/Documents/nodeserver/test");
	actions.perform();
	browser.driver.sleep(5000);

  });
});


    