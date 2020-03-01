const puppeteer = require('puppeteer');

var takeSs = ()=> {

    (async () => {

        console.log('Inside ScreenShot function.. ');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:5001/survey/result');
        await page.screenshot({path: 'files/myImage.png'});
        console.log('ScreenShot saved successfully.. ');
        await browser.close();
      })();

}

module.exports = takeSs;