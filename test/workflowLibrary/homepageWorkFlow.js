import { expect } from 'chai'
import homePage from '../pageobjects/homePage'
import reportLogs from '../logger'
require('dotenv').config()

class HomePageWorkflow {

    /**
     * @description This method is used to convert month string to Number
     * @param {string} month 
     * @author SWARAJ <swaraj.t@unboxrobotics.com>
     * 
     */
    // @ts-ignore
    async #monthStringTonum(month) {
        switch (month) {
            case month: if (month == "Jan") { return "01" }
            else if (month == "Feb") { return "02" }
            else if (month == "Mar") { return "03" }
            else if (month == "Apr") { return "04" }
            else if (month == "May") { return "05" }
            else if (month == "Jun") { return "06" }
            else if (month == "Jul") { return "07" }
            else if (month == "Aug") { return "08" }
            else if (month == "Sep") { return "09" }
            else if (month == "Oct") { return "10" }
            else if (month == "Nov") { return "11" }
            else if (month == "Dec") { return "12" }
            default: reportLogs.logToReport("Provided month is Incorrect")
                console.log("Provided month is Incorrect");
                break;
        }
    }

    /**
         * @description This is used to select the Date Range by providing the following parameters
         * @param {string} fromDay
         * @param {string} fromMon
         * @param {string} fromYr
         * @param {string} fromHr
         * @param {string} fromMin
         * @param {string} fromSec
         * @param {string} toDay
         * @param {string} toMon
         * @param {string} toYr
         * @param {string} toHr
         * @param {string} toMin
         * @param {string} toSec
         * @example homepageworkflow.selectDate("10","Jan","2023","07","00","00","01","Feb","2023","07","00","00")
         * @author SWARAJ <swaraj.t@unboxrobotics.com>
         */
    async selectDateAndTime(fromDay, fromMon, fromYr, fromHr, fromMin, fromSec, toDay, toMon, toYr, toHr, toMin, toSec) {
        await (await homePage.homePageCalenderIcon).click()
        const fromMonthNum = await this.#monthStringTonum(fromMon)
        var fromYearAndMonth = await (await homePage.fromMonthYearText).getText()
        var UIFromMonthtext = fromYearAndMonth.split(" ")[0]
        var UIFromYeartext = Number(fromYearAndMonth.split(" ")[1])
        const numFromMonthText = Number(await this.#monthStringTonum(UIFromMonthtext))
        const uiFDate = new Date(UIFromYeartext, Number(numFromMonthText))
        const userFDate = new Date(Number(fromYr), Number(fromMonthNum))
        console.log(uiFDate);
        console.log(userFDate);
        if (uiFDate > userFDate) {
            while (fromYearAndMonth != `${fromMon} ${fromYr}`) {
                await (await homePage.fromBackIcon).click()
                fromYearAndMonth = await (await homePage.fromMonthYearText).getText()
            }
        }
        else if (uiFDate < userFDate) {
            while (fromYearAndMonth != `${fromMon} ${fromYr}`) {
                await (await homePage.fromForwardIcon).click()
                fromYearAndMonth = await (await homePage.fromMonthYearText).getText()
            }
        }
        if (await (await homePage.selectFromDay(`${Number(fromDay)}`, fromMon, fromYr)).isDisplayed() == true) {
            await (await homePage.selectFromDay(`${Number(fromDay)}`, fromMon, fromYr)).click()
            await (await homePage.fromTimeBtn).click()
            await ((await homePage.selectFromTime("hours", Number(fromHr))).waitForClickable({ timeout: 5000 }))
            await (await homePage.selectFromTime("hours", Number(fromHr))).click()
            await ((await homePage.selectFromTime("minutes", Number(fromMin))).waitForClickable({ timeout: 5000 }))
            await (await homePage.selectFromTime("minutes", Number(fromMin))).click()
            await ((await homePage.selectFromTime("seconds", Number(fromSec))).waitForClickable({ timeout: 5000 }))
            await (await homePage.selectFromTime("seconds", Number(fromSec))).click()
            await (await homePage.fromTimeBtn).click()
            await reportLogs.logToReport(`Selected From Date is ${fromDay} ${fromMon} ${fromYr} and time ${fromHr}:${fromMin}:${fromSec}`)
        }
        else {
            await reportLogs.logToReport(`Provided from day:${fromDay} is not present in this Month:${fromMon} of this Year:${fromYr}`)
        }
        const toMonthNum = await this.#monthStringTonum(toMon)
        var toYearAndMonth = await (await homePage.toMonthYearText).getText()
        var UIToMonthtext = toYearAndMonth.split(" ")[0]
        var UIToYeartext = Number(toYearAndMonth.split(" ")[1])
        const numToMonthText = Number(await this.#monthStringTonum(UIToMonthtext))
        const uiTDate = new Date(UIToYeartext, Number(numToMonthText))
        const userTDate = new Date(Number(fromYr), Number(toMonthNum))
        console.log(uiTDate);
        console.log(userTDate);
        if (userTDate <= uiTDate) {
            if (uiTDate > userTDate) {
                while (toYearAndMonth != `${toMon} ${toYr}`) {
                    await (await homePage.toBackIcon).click()
                    toYearAndMonth = await (await homePage.toMonthYearText).getText()
                }
            }
            else if (uiTDate < userTDate) {
                while (toYearAndMonth != `${toMon} ${toYr}`) {
                    await (await homePage.toForwardIcon).click()
                    toYearAndMonth = await (await homePage.toMonthYearText).getText()
                }
            }
            if (await (await homePage.selectToDay(`${Number(toDay)}`, toMon, toYr)).isDisplayed() == true) {
                await (await homePage.selectToDay(`${Number(toDay)}`, toMon, toYr)).click()
                await (await homePage.toTimeBtn).click()
                await ((await homePage.selectToTime("hours", Number(toHr))).waitForClickable({ timeout: 5000 }))
                await (await homePage.selectToTime("hours", Number(toHr))).click()
                await ((await homePage.selectToTime("minutes", Number(toMin))).waitForClickable({ timeout: 5000 }))
                await (await homePage.selectToTime("minutes", Number(toMin))).click()
                await ((await homePage.selectToTime("seconds", Number(toSec))).waitForClickable({ timeout: 5000 }))
                await (await homePage.selectToTime("seconds", Number(toSec))).click()
                await (await homePage.toTimeBtn).click()
                await reportLogs.logToReport(`Selected To Date is ${toDay} ${toMon} ${toYr} and time ${await ((await homePage.toTimeBtn).getText())}`)
                await (await homePage.calendarOKBtn).waitForEnabled({ timeout: 5000, timeoutMsg: "Ok Button Not Enabled" })
                await (await homePage.calendarOKBtn).click()
            }
            else {
                await reportLogs.logToReport(`Provided to Day:${toDay} is not present in this Month:${toMon} of this Year:${toYr}`)
            }
        }
        else {
            reportLogs.logToReport("Please provide a Valid date Range")
        }
        // console.log(await (await homePage.calenderInput).getText())
        expect(await (await homePage.calenderInput).getText()).to.eq(`${fromDay}-${fromMonthNum}-${fromYr} ${fromHr}:${fromMin}:${fromSec} ~ ${toDay}-${toMonthNum}-${toYr} ${toHr}:${toMin}:${toSec}`)
    }

    /**
     * @description This method is used to compare downtime on the UI with the downtime got from DB
     * @param {any[]|undefined} comparisionValue 
     * @author SWARAJ <swaraj.t@unboxrobotics.com>
     */
    async compareDowntimeWithDB(comparisionValue) {
        await (await homePage.downtimeText).waitForDisplayed({ timeout: 10000, timeoutMsg: "Downtime took more than 10 seconds to load" })
        if (await (await homePage.downtimeText).getText() != "-") {
            var downtimeText = await (await (await homePage.downtimeText).getText()).split(":")
            var hours = Number(downtimeText[0])
            var minutes = Number(downtimeText[1])
            const hoursInSeconds = hours * 3600
            const minutesInSeconds = minutes * 60
            var totalUIDowntime = hoursInSeconds + minutesInSeconds
            // @ts-ignore
            var DBdowntime = Math.ceil(comparisionValue[0].downtime)
            var DArray = [DBdowntime, DBdowntime + 1, DBdowntime + 2, DBdowntime + 3, DBdowntime + 4, DBdowntime + 5,
                DBdowntime + 6, DBdowntime + 7, DBdowntime + 8, DBdowntime + 9, DBdowntime + 10, DBdowntime + 11,
                DBdowntime + 12, DBdowntime + 13, DBdowntime + 14, DBdowntime + 15, DBdowntime + 16, DBdowntime + 17,
                DBdowntime + 18, DBdowntime + 19, DBdowntime + 20, DBdowntime + 21,
                DBdowntime + 22, DBdowntime + 23, DBdowntime + 24, DBdowntime + 25, DBdowntime + 26, DBdowntime + 27,
                DBdowntime + 28, DBdowntime + 29, DBdowntime + 30,
                DBdowntime - 1, DBdowntime - 2, DBdowntime - 3, DBdowntime - 4, DBdowntime - 5,
                DBdowntime - 6, DBdowntime - 7, DBdowntime - 8, DBdowntime - 9, DBdowntime - 10, DBdowntime - 11,
                DBdowntime - 12, DBdowntime - 13, DBdowntime - 14, DBdowntime - 15, DBdowntime - 16, DBdowntime - 17,
                DBdowntime - 18, DBdowntime - 19, DBdowntime - 20, DBdowntime - 21,
                DBdowntime - 22, DBdowntime - 23, DBdowntime - 24, DBdowntime - 25, DBdowntime - 26, DBdowntime - 27,
                DBdowntime - 28, DBdowntime - 29, DBdowntime - 30]
            expect(totalUIDowntime).to.be.oneOf(DArray)
            await reportLogs.logToReport(`The Downtime Displayed on UI is equal to the Downtime Calculated from the DataBase that is ${downtimeText}`)
        }
        else {
            reportLogs.logToReport(`Downtime is not displayed for the Date range`)
        }
    }

    /**
   * @description This method is used to compare Uptime on the UI with the Uptime got from DB
   * @param {any[]|undefined} comparisionValue 
   * @author SWARAJ <swaraj.t@unboxrobotics.com>
   */
    async compareUptimeWithDB(comparisionValue) {
        await (await homePage.uptimeText).waitForDisplayed({ timeout: 10000, timeoutMsg: "Uptime took more than 10 seconds to load" })
        if (await (await homePage.uptimeText).getText() != "-") {
            var uptimeText = await (await (await homePage.uptimeText).getText()).split(":")
            console.log(uptimeText);
            var hours = Number(uptimeText[0])
            var minutes = Number(uptimeText[1])
            console.log(hours, minutes);
            const hoursInSeconds = hours * 3600
            // console.log(hours,"HOURS");
            const minutesInSeconds = minutes * 60
            // console.log(hours,"MINUTES");
            var totalUIUptime = hoursInSeconds + minutesInSeconds
            console.log(totalUIUptime);
            // @ts-ignore
            var DBUptime = Math.ceil(comparisionValue[0].uptime)
            var UArray = [DBUptime, DBUptime + 1, DBUptime + 2, DBUptime + 3, DBUptime + 4, DBUptime + 5,
                DBUptime + 6, DBUptime + 7, DBUptime + 8, DBUptime + 9, DBUptime + 10, DBUptime + 11,
                DBUptime + 12, DBUptime + 13, DBUptime + 14, DBUptime + 15, DBUptime + 16, DBUptime + 17,
                DBUptime + 18, DBUptime + 19, DBUptime + 20, DBUptime + 21,
                DBUptime + 22, DBUptime + 23, DBUptime + 24, DBUptime + 25, DBUptime + 26, DBUptime + 27,
                DBUptime + 28, DBUptime + 29, DBUptime + 30,
                DBUptime - 1, DBUptime - 2, DBUptime - 3, DBUptime - 4, DBUptime - 5,
                DBUptime - 6, DBUptime - 7, DBUptime - 8, DBUptime - 9, DBUptime - 10, DBUptime - 11,
                DBUptime - 12, DBUptime - 13, DBUptime - 14, DBUptime - 15, DBUptime - 16, DBUptime - 17,
                DBUptime - 18, DBUptime - 19, DBUptime - 20, DBUptime - 21,
                DBUptime - 22, DBUptime - 23, DBUptime - 24, DBUptime - 25, DBUptime - 26, DBUptime - 27,
                DBUptime - 28, DBUptime - 29, DBUptime - 30]
            expect(totalUIUptime).to.be.oneOf(UArray)
            await reportLogs.logToReport(`The Uptime Displayed on UI is equal to the Uptime Calculated from the DataBase that is ${uptimeText}`)
        }
        else {
            reportLogs.logToReport(`Uptime is not displayed for the Date range`)
        }
    }

    /**
     * @description This method is used to calculate the Uptime Percentage displayed on UI by dividing uptime by sum of Uptime and Downtime
     * @author SWARAJ <swaraj.t@unboxrobotics.com>
     * @example homePageWorkflow.validateUptimePercentage()
     */
    async validateUptimePercentage() {
        await (await homePage.downtimeText).waitForDisplayed({ timeout: 10000, timeoutMsg: "Downtime took more than 10 seconds to load" })
        await browser.waitUntil(async () => await (await homePage.downtimeText).getText() != "-", {
            timeout: 10000,
            timeoutMsg: "Downtime is displayed as '-'"
        })
        var downtimeText = await (await (await homePage.downtimeText).getText()).split(":")
        var dhours = await Number(downtimeText[0])
        var dminutes = await Number(downtimeText[1])
        const dhoursInSeconds = await dhours * 3600
        const dminutesInSeconds = await dminutes * 60
        var totalUIDowntime = await dhoursInSeconds + dminutesInSeconds
        await console.log(totalUIDowntime);
        await (await homePage.uptimeText).waitForDisplayed({ timeout: 10000, timeoutMsg: "Uptime took more than 10 seconds to load" })
        await browser.waitUntil(async () => await (await homePage.uptimeText).getText() != "-", {
            timeout: 10000,
            timeoutMsg: "Uptime is displayed as '-'"
        })
        var uptimeText = await (await (await homePage.uptimeText).getText()).split(":")
        var uhours = await Number(uptimeText[0])
        var uminutes = await Number(uptimeText[1])
        const uhoursInSeconds = await uhours * 3600
        const uminutesInSeconds = await uminutes * 60
        var totalUIUptime = await uhoursInSeconds + uminutesInSeconds
        await console.log(totalUIUptime);
        await (await homePage.uptimePercentText).waitForDisplayed({ timeout: 10000, timeoutMsg: "Uptime Percentage took more than 10 seconds to load" })
        await browser.waitUntil(async () => await (await homePage.uptimePercentText).getText() != "-%", {
            timeout: 10000,
            timeoutMsg: "Uptime Percentage took more than 10 seconds to load or Uptime percentage is displayed as '-%'"
        })
        var UptimePercentText = await (await (await homePage.uptimePercentText).getText()).split(" ")
        await console.log(UptimePercentText);
        const UIUptimePercentageText = await Math.ceil(Number(UptimePercentText[0]))
        const CalUptimeDowntimePer = Math.ceil((Number(totalUIUptime) / Number(totalUIUptime + totalUIDowntime)) * 100)
        expect(UIUptimePercentageText, "Uptime percentage Displayed is Incorrect").to.eq(CalUptimeDowntimePer)
        reportLogs.logToReport(`Uptime Percentage displayed on UI is ${await (await homePage.uptimePercentText).getText()}`)
    }

    /**
   * @description This method is used to compare Parcel Putaway Count on the UI with the Parcel Putaway Count got from DB
   * @param {any[]|undefined} comparisionValue 
   * @author SWARAJ <swaraj.t@unboxrobotics.com>
   */
    async compareParcelPutawayWithDB(comparisionValue) {
        await (await homePage.parcelPutawayText).waitForDisplayed({ timeout: 10000, timeoutMsg: "Uptime took more than 10 seconds to load" })
        if (await (await homePage.parcelPutawayText).getText() != "-") {
            var parcelPutawayText = await (await homePage.parcelPutawayText).getText()
            // @ts-ignore
            var DbparcelPutawayText = Number(comparisionValue[0].parcelcount) + Number(comparisionValue[1].parcelcount)
            var PutAwayArray = [DbparcelPutawayText, DbparcelPutawayText + 1, DbparcelPutawayText + 2, DbparcelPutawayText + 3, DbparcelPutawayText + 4, DbparcelPutawayText + 5,
                DbparcelPutawayText - 1, DbparcelPutawayText - 2, DbparcelPutawayText - 3, DbparcelPutawayText - 4, DbparcelPutawayText - 5]
            expect(Number(DbparcelPutawayText)).to.be.oneOf(PutAwayArray, "Parcel PutAway Count calculated from DB doesnt match with the UI Count Displayed")
            await reportLogs.logToReport(`The Parcel PutAway Count Displayed on UI is equal to the Parcel PutAway Count Calculated from the DataBase that is ${parcelPutawayText}`)
        }
        else {
            reportLogs.logToReport(`Parcel Putaway is not displayed for the selected date range`)
        }
    }

    /**
    * @description This method is used to validate the Throughput dislayed on the UI
    * @param {any[]|undefined} comparisionValue 
    * @param {any[]|undefined} runtimeNum
    * @author SWARAJ <swaraj.t@unboxrobotics.com>
    */
    async validateThroughput(runtimeNum, comparisionValue) {
        await this.compareParcelPutawayWithDB(comparisionValue)
        const putAwayCount = await (await homePage.parcelPutawayText).getText()
        console.log(putAwayCount, "PutAWay Count");
        // @ts-ignore
        const runtimeInSeconds = Number(await runtimeNum[0].runtime)
        console.log(runtimeInSeconds, "In Seconds");
        const runtimeHr = runtimeInSeconds / 3600
        console.log(runtimeHr, "In hours");
        await browser.waitUntil(async () => await (await homePage.throughput).getText() != '-', {
            timeout: 5000,
            timeoutMsg: "Throughput is not displayed"
        })
        const UIThroughput = Number(await (await homePage.throughput).getText())
        reportLogs.logToReport(`Throughput displayed on the UI is ${UIThroughput}`)
        const calculatedThroughput = Math.ceil(Number(putAwayCount) / runtimeHr)
        expect(UIThroughput).to.be.oneOf([calculatedThroughput, calculatedThroughput + 1, calculatedThroughput - 1, calculatedThroughput - 2, calculatedThroughput + 2])
        reportLogs.logToReport(`The throughput displayed on the UI is equal to the throughput calculated that is ${UIThroughput}`)
    }

    /**
      * @description This method is used to compare Parcel Scanned Count on the UI with the Parcel Scanned Count got from DB
      * @param {any[]|undefined} comparisionValue 
      * @author SWARAJ <swaraj.t@unboxrobotics.com>
      */
    async compareParcelScannedCountWithDB(comparisionValue) {
        await (await homePage.parcelsScannedText).waitForDisplayed({ timeout: 10000, timeoutMsg: "Parcels Scanned took more than 10 seconds to load" })
        if (await (await homePage.parcelsScannedText).getText() != "-") {
            var parcelsScannedCount = await (await homePage.parcelsScannedText).getText()
            // @ts-ignore
            var DbparcelParcelScannedText = await comparisionValue[0].parcelcount
            expect(Number(parcelsScannedCount)).to.be.eq(Number(DbparcelParcelScannedText), "Parcel Scanned Count calculated from DB doesnt match with the UI Count Displayed")
            await reportLogs.logToReport(`The Parcel Scanned Count Displayed on UI is equal to the Parcel Scanned Count Calculated from the DataBase that is ${parcelsScannedCount}`)
        }
        else {
            reportLogs.logToReport(`Parcel Scanned is not displayed for the selected date range`)
        }
    }

    /**
      * @description This method is used to validate the Feeder Throughput dislayed on the UI
      * @param {any[]|undefined} comparisionValue 
      * @param {any[]|undefined} runtimeNum
      * @author SWARAJ <swaraj.t@unboxrobotics.com>
      */
    async validateFeederThroughput(runtimeNum, comparisionValue) {
        await this.compareParcelScannedCountWithDB(comparisionValue)
        const parcelsScannedText = await (await homePage.parcelsScannedText).getText()
        console.log(parcelsScannedText, "Parcel Count");
        // @ts-ignore
        const runtimeInSeconds = Number(await runtimeNum[0].runtime)
        console.log(runtimeInSeconds, "In Seconds");
        const runtimeHr = runtimeInSeconds / 3600
        console.log(runtimeHr, "In hours");
        await browser.waitUntil(async () => await (await homePage.feederThroughputText).getText() != '-', {
            timeout: 5000,
            timeoutMsg: "Feeder Throughput is not displayed"
        })
        const UIFeederThroughput = Number(await (await homePage.feederThroughputText).getText())
        reportLogs.logToReport(`Feeder Throughput displayed on the UI is ${UIFeederThroughput}`)
        const calculatedFeederThroughput = Math.ceil(Number(parcelsScannedText) / runtimeHr)
        expect(UIFeederThroughput).to.be.oneOf([calculatedFeederThroughput, calculatedFeederThroughput + 1, calculatedFeederThroughput - 1, calculatedFeederThroughput - 2, calculatedFeederThroughput + 2])
        reportLogs.logToReport(`The Feeder throughput displayed on the UI is equal to the feeder throughput calculated, that is ${UIFeederThroughput}`)
    }

    /**
         * @description This method is used to validate the Rejection Percentage dislayed on the UI
         * @param {any[]|undefined} parcelsScanned 
         * @param {any[]|undefined} rejectionCount
         * @author SWARAJ <swaraj.t@unboxrobotics.com>
         */
    async verifyRejectionPercentage(parcelsScanned, rejectionCount) {
        await this.compareParcelScannedCountWithDB(parcelsScanned)
        const parcelsScannedText = await (await homePage.parcelsScannedText).getText()
        console.log(parcelsScannedText, "Parcel Count");
        // @ts-ignore
        const DBrejectionCount = Number(await rejectionCount[0].rejection)
        console.log(DBrejectionCount, "Rejection Count");
        let calculatedRejectionPer = Number(DBrejectionCount) / Number(parcelsScannedText)
        calculatedRejectionPer = Math.ceil(calculatedRejectionPer * 100)
        console.log(calculatedRejectionPer, "Rejection Percentage");
        await browser.waitUntil(async () => await (await homePage.rejectionPercentageText).getText() != '-%', {
            timeout: 5000,
            timeoutMsg: "Rejection Percentage is not displayed"
        })
        let UIRejectionPerText = await (await homePage.rejectionPercentageText).getText()
        UIRejectionPerText = UIRejectionPerText.split("%").join("")
        let UIRejectionPer = Number(Math.ceil(Number(UIRejectionPerText)))
        reportLogs.logToReport(`Rejection % displayed on the UI is ${UIRejectionPerText}`)
        expect(UIRejectionPer).to.be.oneOf([calculatedRejectionPer, calculatedRejectionPer + 1, calculatedRejectionPer - 1, calculatedRejectionPer - 2, calculatedRejectionPer + 2])
        reportLogs.logToReport(`The rejection percentage displayed on the UI is equal to the feeder throughput calculated, that is ${UIRejectionPerText}%`)
    }

    /**
     * @description This method is used to verify the Bags Open count displayed on UI with the DB
     * @param {any[]|undefined} comparisionValue 
     * @author SWARAJ <swaraj.t@unboxrobotics.com>
     */
    async verifyBagsOpenWithDB(comparisionValue) {
        await (await homePage.bagsOpenText).waitForDisplayed({ timeout: 10000, timeoutMsg: "Bags Open took more than 10 seconds to load" })
        await (await homePage.bagsOpenText).scrollIntoView()
        if (await (await homePage.bagsOpenText).getText() != "-") {
            var UIbagsOpenText = await (await homePage.bagsOpenText).getText()
            // @ts-ignore
            var DBbagsOpenText = await comparisionValue[0].bagsopen
            expect(Number(DBbagsOpenText)).to.eq(Number(UIbagsOpenText), "Bags Open Count calculated from DB doesnt match with the UI Count Displayed")
            await reportLogs.logToReport(`The Bags Open Count Displayed on UI is equal to the Bags Open Count Calculated from the DataBase that is ${UIbagsOpenText}`)
        }
        else {
            reportLogs.logToReport(`Bags Open count is not displayed for the selected date range`)
        }
    }

    /**
     * @description This method is used to Verify the Parcel Scanned Before Load Count displayed on the UI with DB
     * @param {string} rejectType 
     * @param {any[]|undefined} comparisionValue 
     * @author SWARAJ <swaraj.t@unboxrobotics.com>
     */
    async verifyRejectTypeCount(rejectType, comparisionValue) {
        const ele = await homePage.rejectionTypeText(rejectType)
        for (let i = 0; i < 5; i++) {
            try {
                if ((await ele.isDisplayed()) == true) { break }
            } catch (error) {
                await browser.pause(500)
            }
        }
        if ((await ele.isDisplayed()) == true) {
            await ele.scrollIntoView()
            await ele.moveTo()
          await console.log(ele);
            await browser.pause(1000)
            const UIrejectionCount = await ele.getAttribute('data:value')
            // @ts-ignore
            const DBrejectionCount = comparisionValue[0].rejectnumber
            reportLogs.logToReport(`The Rejection count displayed for ${rejectType} on UI is ${UIrejectionCount}`)
            const UIrejectionCountArr = [Number(UIrejectionCount), Number(UIrejectionCount) + 1, Number(UIrejectionCount) - 1]
            expect(Number(DBrejectionCount)).to.be.oneOf(UIrejectionCountArr, "The UI rejection count doesnt match with DB rejection count")
            await reportLogs.logToReport(`The rejection count for ${rejectType} displayed on UI is equal to the value calculated in DB that is ${UIrejectionCount}`)
        }
        else {
            await reportLogs.logToReport(`The rejection count for ${rejectType} is not displayed in the Pie Chart`)
        }
    }

     /**
     * @description This method is used to verify the Bags Closed count displayed on UI with the DB
     * @param {any[]|undefined} comparisionValue 
     * @author SWARAJ <swaraj.t@unboxrobotics.com>
     */
     async verifyBagsClosedWithDB(comparisionValue) {
        await (await homePage.bagsClosedText).waitForDisplayed({ timeout: 10000, timeoutMsg: "Bags Closed took more than 10 seconds to load" })
        await (await homePage.bagsClosedText).scrollIntoView()
        if (await (await homePage.bagsClosedText).getText() != "-") {
            var UIbagsClosedText = await (await homePage.bagsClosedText).getText()
            // @ts-ignore
            var DBbagsClosedText = await comparisionValue[0].closed
            expect(Number(DBbagsClosedText)).to.eq(Number(UIbagsClosedText), "Bags Closed Count calculated from DB doesnt match with the UI Count Displayed")
            await reportLogs.logToReport(`The Bags Closed Count Displayed on UI is equal to the Bags Closed Count Calculated from the DataBase that is ${UIbagsClosedText}`)
        }
        else {
            reportLogs.logToReport(`Bags Closed count is not displayed for the selected date range`)
        }
    }

}
export default new HomePageWorkflow();