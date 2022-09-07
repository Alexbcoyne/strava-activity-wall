const auth_link = "https://www.strava.com/oauth/token";

function getActivities(res) {
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`;
    fetch(activities_link)
        .then(function(response) {
            response.json().then(function(activityDates) {
                activityDates.forEach(function(activityDate) {
                    const dates = activityDate.start_date;
                    console.log(dates);
                })
            })
        });
    var cal = new CalHeatMap();
    cal.init({
        domain: "year",
        subDomain: "day",
        data: dates,
        cellSize: 10,
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
