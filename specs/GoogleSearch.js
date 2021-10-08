const { browser, driver, ElementFinder, ExpectedConditions, Key} = require("protractor");

describe('Google - Search', function () {
  
    browser.ignoreSynchronization = true;
  
    it('LambdaTest', function () {
  
  try {
    
    browser.get('https://google.com/');
  
    console.log("---------Google Search-----------")
  
    browser.driver.findElement(by.name('q')).then(function (foundElement) {
                foundElement.sendKeys('LambdaTest');
                foundElement.sendKeys(Key.ENTER)
                console.log("Typing LambdaTest")
            });
          
  } catch (error) {   
    console.log(error)
  }
  });  
});

