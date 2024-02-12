/* IMPORTS */
import dbase from '../../genericUtility/dbUtility'
import testData from '../Testdata/data'
import homepageWorkFlow from '../../workflowLibrary/homepageWorkFlow'
import loginWorkFlow from '../../workflowLibrary/loginWorkFlow'

/* TEST CASE */
describe('Navigate to the Application and verify Throughput', () => {
    it('Login to the application and select a date range and Verify the throughput displayed', async () => {
        await loginWorkFlow.loginOperation()
        await homepageWorkFlow.selectDateAndTime(testData.days[18],testData.months.march,testData.years[2023],testData.hours[7],testData.minOrsec[0],testData.minOrsec[0],
            testData.days[18],testData.months.march,testData.years[2023],testData.hours[20],testData.minOrsec[0],testData.minOrsec[0])
        const runtime=await dbase.executeQueryInDatabase(testData.dbqueries.sumOfRuntimeQuery)
        const parcelPutAway=await dbase.executeQueryInDatabase(testData.dbqueries.parcelPutAwayQuery)
        console.log(runtime);
        console.log(parcelPutAway);
        await homepageWorkFlow.validateThroughput(runtime,parcelPutAway)
        
    })
})
