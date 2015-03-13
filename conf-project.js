exports.config = {
  chromeDriver: './chromedriver',  
  directConnect: true,
  specs: ['spec-project.js'],
  capabilities: {
  	'browserName': 'chrome',
  	'chromeOptions': {
  		binary: '/Applications/Brackets.app/Contents/MacOS/Brackets',
      args: [],
  		extensions: [], 
  	}
  }
}
