const loginPageData = {
    welcomeBackText:"Welcome Back",
    appTitle:"Unbox Dashboard"
}
const homePageData={
    homePageText:"Home",
    inputDate:"18-03-2023 07:00:00 ~ 25-03-2023 07:00:00"
}
const months={
    january:"Jan",
    february:"Feb",
    march:"Mar",
    april:"Apr",
    may:"May",
    june:"Jun",
    july:"Jul",
    august:"Aug",
    september:"Sep",
    october:"Oct",
    november:"Nov",
    december:"Dec"
}
const days={
    1:"1",
    2:"2",
    3:"3",
    4:"4",
    5:"5",
    6:"6",
    7:"7",
    8:"8",
    9:"9",
    10:"10",
    11:"11",
    12:"12",
    13:"13",
    14:"14",
    15:"15",
    16:"16",
    17:"17",
    18:"18",
    19:"19",
    20:"20",
    21:"21",
    22:"22",
    23:"23",
    24:"24",
    25:"25",
    26:"26",
    27:"27",
    28:"28",
    29:"29",
    30:"30",
    31:"31"
}
const years={
    2021:"2021",
    2022:"2022",
    2023:"2023"
}
const hours={
    0:"00",
    1:"01",
    2:"02",
    3:"03",
    4:"04",
    5:"05",
    6:"06",
    7:"07",
    8:"08",
    9:"09",
    10:"10",
    11:"11",
    12:"12",
    13:"13",
    14:"14",
    15:"15",
    16:"16",
    17:"17",
    18:"18",
    19:"19",
    20:"20",
    21:"21",
    22:"22",
    23:"23"
}
const minOrsec={
    0:"00",
    1:"01",2:"02",3:"03",4:"04",5:"05",6:"06",7:"07",8:"08",9:"09",10:"10",11:"11",12:"12",13:"13",14:"14",15:"15",
    16:"16",17:"17",18:"18",19:"19",20:"20",21:"21",22:"22",23:"23",24:"24",25:"25",26:"26",27:"27",
    28:"28",29:"29",30:"30",31:"31",32:"32",33:"33",34:"34",35:"35",36:"36",37:"37",38:"38",39:"39",40:"40",
    41:"41",42:"42",43:"43",44:"44",45:"45",46:"46",47:"47",48:"48",49:"49",50:"50",
    51:"51",52:"52",53:"53",54:"54",55:"55",56:"56",57:"57",58:"58",59:"59"

}
const dbqueries={
    sumOfDowntimeQuery:`select sum(td) as downtime
    from analytics.tns_session_parameters tsp 
    where tsp.function_start_time >='2023-03-18 07:00:00' and tsp.function_end_time <='2023-03-18 20:00:00'`,
    sumOfUptimeQuery:`select sum(tu) as uptime
    from analytics.tns_session_parameters tsp 
    where tsp.function_start_time >='2023-03-18 07:00:00' and tsp.function_end_time <='2023-03-18 20:00:00'`,
    parcelPutAwayQuery:`select count(*) as parcelCount, date_trunc('day',created_at at time zone 'Asia/Kolkata') as createdAt , status, current_stage
    from ecs.tns_parcel_status as tps
    where (tps.created_at >= '2023-03-18 07:00:00.000' and tps.created_at <= '2023-03-18 20:00:00.000') and current_stage in ('added_to_bag','bag_closed')
    group by tps.status,createdAt, tps.current_stage
    order by createdAt`,
    sumOfRuntimeQuery:`select sum(tr) as runtime
    from analytics.tns_session_parameters tsp 
    where tsp.function_start_time >='2023-03-18 07:00:00' and tsp.function_end_time <='2023-03-18 20:00:00'`,
    countOfParcelsScannedQuery:`select count(*) as parcelCount
    from ecs.tns_parcel_status as tps
    where tps.created_at >= '2023-03-18 07:00:00' and tps.created_at <= '2023-03-18 20:00:00'`,
    rejectionCountQuery:`select count(*) as rejection
    from ecs.tns_parcel_status as tps
    where tps.created_at >= '2023-03-18 07:00:00' and tps.created_at <= '2023-03-18 20:00:00' and status='rejected'`,
    bagsOpenCountQuery:`select count(*) as bagsOpen
    from ecs.tns_bag_status tbs2
    where tbs2.created_at between '2023-03-18 07:00:00' and '2023-03-31 12:00:00' and tbs2.bag_status ='open'`,
    parcelScannedBeforeLoadQuery:`select count(*) as rejectNumber
    from ecs.tns_parcel_status tps2
    where tps2.created_at between '2023-03-18 07:00:00' and '2023-03-31 11:58:00' and tps2.rejection_type = 'RJT01' `,
    parcelLoadBeforeScanQuery:`select count(*) as rejectNumber
    from ecs.tns_parcel_status tps2
    where tps2.created_at between '2023-03-18 07:00:00' and '2023-03-31 11:58:00' and tps2.rejection_type = 'RJT02' `,
    parcelScanBeforeResetQuery:`select count(*) as rejectNumber
    from ecs.tns_parcel_status tps2
    where tps2.created_at between '2023-03-18 07:00:00' and '2023-03-31 11:58:00' and tps2.rejection_type = 'RJT03' `,
    bagsClosedQuery:`select count(*) as closed
    from ecs.tns_bag_history tbh
    where tbh.updated_at between '2023-03-18 07:00:00' and '2023-03-30 07:00:00'`
}
const rejectionTypesList={
    RJT01:"PARCELxSCANxBEFORExLOAD",
    RJT02:"PARCELxLOADxWITHOUTxSCAN",
    RJT03:"PARCELxSCANxBEFORExRESET",
    RJT04:"REJECTxPARCELxKEPTxONxROBOT"
}
exports.rejectionTypesList=rejectionTypesList
exports.loginPageData=loginPageData
exports.homePageData=homePageData
exports.months=months
exports.days=days
exports.years=years
exports.hours=hours
exports.minOrsec=minOrsec
exports.dbqueries=dbqueries