import { Builder, Browser, By, Key, until } from "selenium-webdriver";

export const getKeywordIdeas = async (countryCode: string, keyword: string) => {
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  await driver.get(`https://www.google.com/`);
  const searchInput = driver.findElement(By.css('textarea[title="Search"]'));
  await driver.wait(until.elementIsVisible(searchInput), 1000);
  for (let each of keyword) {
    await searchInput.sendKeys(each);
    await driver.sleep(Math.random() * 1000);
  }
  await searchInput.sendKeys(Key.ENTER);
};
