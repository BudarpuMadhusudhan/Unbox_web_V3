/* IMPORTS */
import dbase from '../../genericUtility/dbUtility'
import testData from '../Testdata/data'
import homepageWorkFlow from '../../workflowLibrary/homepageWorkFlow'
import loginWorkFlow from '../../workflowLibrary/loginWorkFlow'

/* TEST CASE */
describe('Navigate to the Application and verify Bags Open Count', () => {
    it('Login to the application and select a date range and Verify the Bags Open Count displayed', async () => {
        await loginWorkFlow.loginOperation()
        await homepageWorkFlow.selectDateAndTime(testData.days[18],testData.months.march,testData.years[2023],testData.hours[7],testData.minOrsec[0],testData.minOrsec[0],
            testData.days[31],testData.months.march,testData.years[2023],testData.hours[12],testData.minOrsec[0],testData.minOrsec[0])
        const result=await dbase.executeQueryInDatabase(testData.dbqueries.bagsOpenCountQuery)
        console.log(result);
        await homepageWorkFlow.verifyBagsOpenWithDB(result)
    })
})
