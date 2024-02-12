class LoginPage {

    get signInBTN() {
        return $("//button[contains(.,'Sign In')]")
    }

    get emailTxtField() {
        return $("//input[@type='email']")
    }

    get passwordTxtField() {
        return $("//input[@type='password']")
    }

    get rememberMeChkBox(){
        return $("//input[@type='checkbox']")
    }

    get welcomeBackText() {
        return $("//div[@class='sc-irLwvL gozqsR']")
    }

}
export default new LoginPage();