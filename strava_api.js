const auth_link = "https://www.strava.com/oauth/token";

function getActivities(res) {
    var cal = new CalHeatMap();
    var datas = getDate(res)
    var dataJSON = {}

    datas = JSON.parse(datas)

    for (let i = 0; i < datas.length; i++) {
        convertDate = Number(new Date(datas[i].start_date)) / 1000, [i];
        movingTime = datas[i].moving_time / 400;

        dataJSON[convertDate] = movingTime
    }
    console.log(dataJSON);

    cal.init({
        domain: "year",
        subDomain: "day",
        data: dataJSON,
        afterLoadData: dataJSON,
        cellSize: 16,
        range: 1,
        legend: [20, 40, 60, 80]
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
        .then(res => getActivities(res))
}

reAuthorize();

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

var parser = function(data) {
    var dataJSON = {};
    for(var i=0; i<data.length; i++) {
        convertDate = Number(new Date(datas[i].start_date)) / 1000 // Date of activity
        console.log(convertDate)
    }
    return dataJSON;
};