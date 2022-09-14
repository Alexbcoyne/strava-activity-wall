# Strava Activity Wall - WIP
This project ties your recent Strava activities to a GitHub contribution wall clone. It gives the user a visualisation of their activities over the year. 

Disclaimer: This is a work-in-progress, it will not run unless built locally as it is not using a server to retrieve data. **This is not the end functionality**. I aim to have users authenticate the app to their own accounts to show them their activities without having to do the steps below.

<br>

## Getting Started
### Create App:
Follow the official [Strava App Guide](https://developers.strava.com/docs/getting-started/) to get the app up and running.

**NOTE: Make sure to include the items below in their respective fields.**

    Website: http://127.0.0.1:5501/index.html
    Authorization Callback Domain: localhost

Hit Create/Update. Notice your ClientID, Client Secret, Access and Refresh Tokens, you will need these in the next steps.

<br>

### Postman Requests:

Open up Postman and follow this [YouTube tutorial](https://www.youtube.com/watch?v=sgscChKfGyg&t=639s&ab_channel=franchyze923) and find, copy/paste the requests [here](https://github.com/franchyze923/Code_From_Tutorials/blob/master/Strava_Api/request_links.txt). This will give us the correct Client Secret, Access and Refresh Tokens.

<br>

### Last steps:

    git clone https://github.com/Alexbcoyne/strava-activity-wall.git

Open it in your prefered editor and exchange the the Client ID, Client Secret and Refresh Token with your own and run the application. It will be showing your activities on the calendar on [localhost](http://localhost:5500/).

<br>

## To Do
- [x] Read dates correctly and project colour on calendar
- [x] Read duration of activity to determine strength of colour
- [ ] Build Auth / Webhooks / Server
- [ ] Show date from one year ago to today
- [ ] Beautify
- [ ] Build a more in-depth README

<br>

## Useful Bits
https://developers.strava.com/

https://www.strava.com/settings/api

https://cal-heatmap.com/

https://github.com/franchyze923/Code_From_Tutorials/blob/master/Strava_Api/request_links.txt

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
