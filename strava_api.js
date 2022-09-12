const auth_link = "https://www.strava.com/oauth/token";

function getActivities(res) {
    var cal = new CalHeatMap();
    var datas = [
        {date: getDate(res), value: 30}
    ]

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

function getDate(res) {
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`;
    // return fetch(activities_link)
    //     .then(res => res.json())
    //     .then(json => {
    //         console.log(json)
    //     })
    //     .catch(error => new Error(error))
    // $.getJSON(activities_link, function(data) {
    //     console.log(data)
    // })

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