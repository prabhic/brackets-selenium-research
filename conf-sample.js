exports.config = {
  chromeDriver: './chromedriver',  
  directConnect: true,
  specs: ['spec-sample.js'],
  capabilities: {
  	'browserName': 'chrome',
  	'chromeOptions': {
  		binary: '/Applications/Brackets.app/Contents/MacOS/Brackets',
      args: [],
  		extensions: [], 
  	}
  }
}
