const auth_link = "https://www.strava.com/oauth/token";

function getActivities(res) {
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`;
    fetch(activities_link)
        .then(function(response) {
            response.json().then(function(activities) {
                activities.forEach(function(activity) {
                    const dates = activity.start_date;
                    const duration = activity.elapsed_time;
                    console.log(dates + " | " + duration);
                })
            })
        });
    var cal = new CalHeatMap();
    cal.init({
        domain: "year",
        subDomain: "day",
        //data: dates,
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
            client_id: '<your_client_id>',
            client_secret: '<client_secret>',
            refresh_token: '<refresh_token>',
            grant_type: 'refresh_token'
        })
    }).then(res => res.json())
        .then(res => getActivities(res))
}

reAuthorize();
