const auth_link = "https://www.strava.com/oauth/token";

function getActivities(res) {
    var cal = new CalHeatMap();
    var datas = [
        {date: 1660375704, value: 15},
        {date: 1660548504, value: 25},
        {date: 1660725704, value: 10},
    ];
    var parser = function(data) {
        var stats = {};
        for (var d in data) {
            stats[data[d].date] = data[d].value;
        }
        return stats;
    };
    cal.init({
        domain: "year",
        subDomain: "day",
        data: datas,
        afterLoadData: parser,
        cellSize: 16,
        range: 1,
        legend: [20, 40, 60, 80]
    });

    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`;
    fetch(activities_link)
        .then(res => res.json())
        .then(json => {
            for (let i = 0; i < json.length; i++) {
                var date = json[i].start_date;
                convertDate = Number(new Date(date)) / 1000;
                console.log(convertDate);
            }
        })
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
        .then(res => getActivities(res))
}

reAuthorize();

