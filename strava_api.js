const auth_link = "https://www.strava.com/oauth/token";

function convertActivityLog(res) {
    var data = getDate(res)
    var dataJSON = {}
    data = JSON.parse(data)

    for (let i = 0; i < data.length; i++) {
        convertDate = Number(new Date(data[i].start_date)) / 1000; // get and convert start_date to epoch
        movingTime = data[i].moving_time; // divide by 400 (TBD) to show length of activity in an intensity form
        dataJSON[convertDate] = movingTime
    }

    var cal = new CalHeatMap();
    cal.init({ 
        domain: "year",
        subDomain: "day",
        data: dataJSON,
        cellSize: 16,
        range: 1,
        legend: [600, 1800, 3600, 7200] // 10, 20, 30, 45, 60, 90, 120, 180, 240,
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
            client_id: '93196',
            client_secret: '49ffc5e4c547bb5b35aaee4406eef40497633a6e',
            refresh_token: 'd1278045ff27018738ee7f7605e0e1d534d3f0c4',
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
