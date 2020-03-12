import puppeteer from 'puppeteer';

export const itemCrawl = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://escapefromtarkov.gamepedia.com/Loot', {waitUntil: ['domcontentloaded', 'networkidle2']});
  const items = await page.$$("table.wikitable > tbody > tr");
  const data = [];
  for (const item of items.slice(1)) {
    const headers = await item.$$('th');
    const icon = await (await (await (await headers[0]?.$('img'))?.getProperty('src'))?.jsonValue());
    const name = await headers[1]?.$eval('a', elm => elm.textContent);
    data.push({name, icon});
  }
  console.log(data);
  await browser.close();
};
