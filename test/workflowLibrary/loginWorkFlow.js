import { expect } from 'chai'
import loginPage from '../pageobjects/loginPage'
import testData from '../specs/Testdata/data'
import homePage from '../pageobjects/homePage'
import reportLogs from '../logger'
require('dotenv').config()

class LoginWorkflow {

    /**
     * @description This method is used to launch the application by providing the URL a parameter
     * @param {string | undefined} appURL'
     * @author SWARAJ <swaraj.t@unboxrobotics.com>
     */
    async launchApplication(appURL) {
        await browser.maximizeWindow()
        // @ts-ignore
        await browser.url(appURL)
        const title = await browser.getTitle()
        await expect(title).to.eq(testData.loginPageData.appTitle)
        reportLogs.logToReport(`${title} title is Displayed`)
    }

    /**
     * @description This method is used to login to the application by providing the user Email and Password
     * @author SWARAJ <swaraj.t@unboxrobotics.com>
     */
    async loginOperation() {
        await (await loginPage.welcomeBackText).waitForDisplayed({ timeout: 5000, timeoutMsg: "Welcome Back text is not Displayed" })
        expect(await (await loginPage.welcomeBackText).getText()).to.eq(testData.loginPageData.welcomeBackText, "Welcome Back actual Text doesnt match with the expected text")
        await reportLogs.logToReport("Navigated to URL Login Page is Displayed")
        await (await loginPage.emailTxtField).waitForDisplayed({ timeout: 5000, timeoutMsg: "Email text Field is not displayed" })
        await (await loginPage.passwordTxtField).waitForDisplayed({ timeout: 5000, timeoutMsg: "Password text field is not displayed" })
        await (await loginPage.rememberMeChkBox).waitForDisplayed({ timeout: 5000, timeoutMsg: "Remember me checkbox is not displayed" })
        await (await loginPage.signInBTN).waitForDisplayed({ timeout: 5000, timeoutMsg: "SignIn Button is not displayed" })
        await (await loginPage.signInBTN).click()
        await reportLogs.logToReport("Logged into the application")
        await (await homePage.homePageHeading).waitForDisplayed({ timeout: 5000, timeoutMsg: "Home page heading is not displayed" })
        expect(await (await homePage.homePageHeading).getText()).to.eq(testData.homePageData.homePageText, "Home page actual text doesnt match with the expected text")
        await reportLogs.logToReport("Home Page is Displayed")
    }
    
}
export default new LoginWorkflow();