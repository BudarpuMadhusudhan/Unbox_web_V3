class HomePage {

    get homePageHeading() {
        return $("//h3[.='Home']")
    }

    get homePageCalenderIcon() {
        return $("//*[local-name()='svg' and @aria-label='calendar']")
    }

    get calenderInput() {
        return $("//div[@class='rs-stack-item']")
    }

    get calendarOKBtn() {
        return $("//button[.='OK']")
    }

    get fromMonthYearText() {
        return $("//div[@index='0']/descendant::button[contains(@class,'rs-calendar-header-title rs-calendar-header-title-date rs-btn rs-btn-subtle rs-btn-xs')]")
    }

    get fromBackIcon() {
        return $("//div[@index='0']/descendant::button[contains(@class,'rs-calendar-header-backward')]")
    }

    get fromForwardIcon() {
        return $("//div[@index='0']/descendant::button[contains(@class,'rs-calendar-header-forward')]")
    }
    get toMonthYearText() {
        return $("//div[@index='1']/descendant::button[contains(@class,'rs-calendar-header-title rs-calendar-header-title-date rs-btn rs-btn-subtle rs-btn-xs')]")
    }

    get toBackIcon() {
        return $("//div[@index='1']/descendant::button[contains(@class,'rs-calendar-header-backward')]")
    }

    get toForwardIcon() {
        return $("//div[@index='1']/descendant::button[contains(@class,'rs-calendar-header-forward')]")
    }

    /**
     * 
     * @param {string} fromDay 
     * @param {string} fromMon 
     * @param {string} fromYear 
     */
    async selectFromDay(fromDay, fromMon, fromYear) {
        return $(`//div[@index='0']/descendant::div[@aria-label='${fromDay} ${fromMon} ${fromYear}']`)
    }

    /**
   * 
   * @param {string} fromDay 
   * @param {string} fromMon 
   * @param {string} fromYear 
   */
    async selectToDay(fromDay, fromMon, fromYear) {
        return $(`//div[@index='1']/descendant::div[@aria-label='${fromDay} ${fromMon} ${fromYear}']`)
    }

    get downtimeText() {
        return $("//h6[.='Downtime']/parent::div/preceding-sibling::div/h6")
    }

    get uptimeText() {
        return $("//h6[.='Uptime']/parent::div/preceding-sibling::div/h6")
    }

    get uptimePercentText() {
        return $("//h6[.='Uptime Percent']/parent::div/preceding-sibling::div/h6")
    }

    /**
     * @description This method is used to select the from date range by providing the following parameters
     * @param {string} timeUnit hours minutes seconds 
     * @param {Number} numberinput hours 0 to 23, minutes 0 to 60, seconds 0 to 60
     * @description For Hours Selection
     * @example selectFromTime(hours,12)
     * @description For Minutes Selection
     * @example selectFromTime(minutes,12)
     * @description For Seconds Selection
     * @example selectFromTime(seconds,12)
     * @author SWARAJ <swaraj.t@testyantra.com>
     */
    async selectFromTime(timeUnit, numberinput) {
        return $(`//div[@index='0']/descendant::ul[@data-type='${timeUnit}']/li/a[.='${numberinput}']`)
    }

    /**
        * @description This method is used to select the To date range by providing  the following parameters
        * @param {string} timeUnit hours minutes seconds 
        * @param {Number} numberinput hours 0 to 23, minutes 0 to 60, seconds 0 to 60
        * @description For Hours Selection
        * @example selectFromTime(hours,12)
        * @description For Minutes Selection
        * @example selectFromTime(minutes,12)
        * @description For Seconds Selection
        * @example selectFromTime(seconds,12)
        * @author SWARAJ <swaraj.t@testyantra.com>
        */
    async selectToTime(timeUnit, numberinput) {
        return $(`//div[@index='1']/descendant::ul[@data-type='${timeUnit}']/li/a[.='${numberinput}']`)
    }

    get fromTimeBtn() {
        return $("//div[@index='0']/descendant::div[@class='rs-calendar-header-time-toolbar']/button")
    }
    get toTimeBtn() {
        return $("//div[@index='1']/descendant::div[@class='rs-calendar-header-time-toolbar']/button")
    }

    get parcelPutawayText() {
        return $("//h6[.='Parcels Putaway']/parent::div/preceding-sibling::div/h6")
    }

    get throughput() {
        return $("//h6[.='Throughput']/parent::div/preceding-sibling::div/h3")
    }

    get parcelsScannedText() {
        return $("//h6[.='Parcels Scanned']/parent::div/preceding-sibling::div/h3")
    }

    get feederThroughputText() {
        return $("//h6[.='Feeder Throughput']/parent::div/preceding-sibling::div/h6")
    }

    get rejectionPercentageText() {
        return $("//h6[.='Rejection']/parent::div/preceding-sibling::div/h6")
    }

    get bagsClosedText() {
        return $("//h6[.='Bags Closed']/parent::div/preceding-sibling::div/h3")
    }

    get bagsOpenText() {
        return $("//h6[.='Bags Open']/parent::div/preceding-sibling::div/h6")
    }

    get maxAgeText() {
        return $("//h6[.='Max Age']/parent::div/preceding-sibling::div/h6")
    }

    get bagsFullText() {
        return $("//h6[.='Bags Full']/parent::div/preceding-sibling::div/h6")
    }

    /**
     * @param {string} rejectType 
     * @returns {Promise<WebdriverIO.Element>}
     */
    async rejectionTypeText(rejectType) {
        return $(`//*[@seriesName='${rejectType}' and @class='apexcharts-series apexcharts-pie-series']//*`)
    }

}
export default new HomePage();