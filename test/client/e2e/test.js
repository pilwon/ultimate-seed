/*
 * test/client/e2e/test.js
 */

'use strict';

describe('Registration/Login', function () {
  beforeEach(function () {
    // URL is relative to baseUrl specified in config/test/protractor-e2e.conf.js
    browser.get('');
  });

  it('should create a new user', function () {
    // Click the lock icon
    element(by.css('.dropdown')).click();
    // Drop down menu should appear
    var dropDownMenu = element(by.css('.dropdown-menu'));
    expect(dropDownMenu.isDisplayed()).toBe(true);
    // Should find Register button
    var registerButton = dropDownMenu.findElement(by.css('li:nth-child(2)'));
    expect(registerButton.getText()).toContain('Register');
    registerButton.click();
    // Should move to register page
    expect(browser.getCurrentUrl()).toContain('localhost:3000/register');
    // Should successfully register a user
    element(by.name('username')).sendKeys('test@example.com');
    element(by.name('password')).sendKeys('123456');
    element(by.name('passwordRepeat')).sendKeys('123456');
    element(by.name('firstName')).sendKeys('Brian');
    element(by.name('lastName')).sendKeys('Park');
    element(by.css('.btn-register')).click();
    // Should show the first name where the lock icon was
    expect(element(by.css('.dropdown a')).getText()).toContain('Brian');
  });
});
