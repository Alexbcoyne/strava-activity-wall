const auth_link = "https://www.strava.com/oauth/token";

function convertActivityLog(res) {
    var data = getDate(res)
    var dataJSON = {}
    data = JSON.parse(data)

    for (let i = 0; i < data.length; i++) {
        convertDate = Number(new Date(data[i].start_date)) / 1000; // get and convert start_date to epoch
        movingTime = Math.round(data[i].moving_time / 60);
        dataJSON[convertDate] = movingTime
    }

    var cal = new CalHeatMap();
    cal.init({ 
        domain: "year",
        subDomain: "day",
        data: dataJSON,
        cellSize: 16,
        range: 1,
        legend: [60, 180, 360, 720],
        itemName: ["Active Minute", "Active Minutes"]
    });
}

function reAuthorize(){
    fetch(auth_link,{
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: '<your_client_id>',
            client_secret: '<client_secret>',
            refresh_token: '<refresh_token>',
            grant_type: 'refresh_token'
        })
    }).then(res => res.json())
        .then(res => convertActivityLog(res))
}

function getDate(res) {
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`;
    var result = null;
    $.ajax({
        url: activities_link,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
            result = data;
        }
    });
    return result;
}

reAuthorize();
