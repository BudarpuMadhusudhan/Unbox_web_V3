/* IMPORTS */
import dbase from '../../genericUtility/dbUtility'
import testData from '../Testdata/data'
import homepageWorkFlow from '../../workflowLibrary/homepageWorkFlow'
import loginWorkFlow from '../../workflowLibrary/loginWorkFlow'

/* TEST CASE */
describe('Navigate to the Application and verify parcel scanned before load', () => {
    it('Login to the application and select a date range and Verify the Parcel Scanned before load', async () => {
        await loginWorkFlow.loginOperation()
        await homepageWorkFlow.selectDateAndTime(testData.days[18], testData.months.march, testData.years[2023], testData.hours[7], testData.minOrsec[0], testData.minOrsec[0],
            testData.days[31], testData.months.march, testData.years[2023], testData.hours[11], testData.minOrsec[58], testData.minOrsec[0])
        const result = await dbase.executeQueryInDatabase(testData.dbqueries.parcelScannedBeforeLoadQuery)
        console.log(result);
        await homepageWorkFlow.verifyRejectTypeCount(testData.rejectionTypesList.RJT01, result)
    })
})
