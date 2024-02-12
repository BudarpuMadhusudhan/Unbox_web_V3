class BrowserUtility {

   /**
     * @param {{ waitForDisplayed: () => void; click: () => void; }} element
     */
   async doClick(element) {
        element.waitForDisplayed()
        element.click();
    }

  
    /**
     * @param {{ waitForDisplayed: () => void; setValue: (arg0: any) => void; }} element
     * @param {any} text
     */
    doSetValue(element, text) {
        element.waitForDisplayed();
        element.setValue(text);
    }

    /**
     * @param {{ waitForDisplayed: () => void; isDisplayed: () => any; }} element
     */
    doIsDisplayed(element) {
        element.waitForDisplayed();
        return element.isDisplayed();
    }

    /**
     * @param {{ waitForDisplayed: () => void; getText: () => any; }} element
     */
    doGetText(element) {
        element.waitForDisplayed();
        return element.getText();
    }

}

export default new BrowserUtility();