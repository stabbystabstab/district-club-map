# District Club Map
This small JavaScript Project has been created to help Toastmasters members from around the world visualise how their Toastmasters District is organised geographically.

## TL;DR
Copy and paste this, just specify your district and Google Maps API key:
```html
<div id="district-club-map" style="width:100%; height:600px"></div>
<script src="https://opentm.org/resources/district-club-map/2.0/district-club-map.js"></script>
<script>
  var mapParameters = new DistrictClubMap();
  mapParameters.district = 73; // YOUR DISTRICT NUMBER GOES HERE
  mapParameters.googleMapsAPIKey = 'YOUR GOOGLE MAPS API KEY GOES HERE';
  mapParameters.elementId = 'district-club-map'; // optional, default = 'district-club-map', id of div element to create map inside of
  mapParameters.districtSelect = false; // optional, default = false, causes map to be redrawn if a different district is selected.
  mapParameters.startingZoom = 5; //optional, default = 5, play with this and see what works for your District's geographical size
  mapParameters.corsProxy = 'https://4562kgf09e.execute-api.us-west-2.amazonaws.com/default/search-clubs', // optional. Add a reference to your own cors tool. Default goes to an AWS Lambda function I created, but who knows, I might stop paying my AWS bill one day! 😜 
  setMapParameters(mapParameters);
</script>
```

## How to Use:

1. Register for a Google Maps API key and restrict it for use on the domain of your website.

2. Add this element in the place where you want the map to be displayed. Set the height appropriately:
```html
<div id="district-club-map" style="width:100%; height:600px"></div>
```
3. Import the desired verion of this file: https://github.com/stabbystabstab/district-club-map/blob/master/js/district-club-map.js
  You can save it as a resource and load it from your application server. Alternatively, I'm serving the current version from an S3 bucket here (I'll probably never remove it):
  ```html
<script src="https://opentm.org/resources/district-club-map/2.0/district-club-map.js"></script>
````

4. Add this JS somewhere on the same page, specifying your Google Maps API Key:
```javascript
  var mapParameters = new DistrictClubMap();
  mapParameters.district = 73; // Your district number
  mapParameters.googleMapsAPIKey = 'YOUR GOOGLE MAPS API KEY GOES HERE';
  mapParameters.elementId = 'district-club-map'; // optional, default = 'district-club-map', id of div element to create map inside of
  mapParameters.districtSelect = false; // optional, default = false, causes map to be redrawn if a different district is selected.
  mapParameters.startingZoom = 5; //optional, default = 5, play with this and see what works for your District's geographical size
  mapParameters.corsProxy = 'https://4562kgf09e.execute-api.us-west-2.amazonaws.com/default/search-clubs', // optional. Add a reference to your own cors tool. Default goes to an AWS Lambda function I created, but who knows, I might stop paying my AWS bill one day! 😜 
  setMapParameters(mapParameters);
```

And you're done.

Example of a simple configuration: https://opentm.org/project/map/district-club-map-simple.html
Example of using a select drop down to change between districts: https://opentm.org/project/map/district-club-map.html


P.S. Please make a PR if you think you can improve this!! I know there are some talented Toastmasters out there! ;)

## Release 2.0 (2020-02-27)
I was previously using someone's heroku deployment of cors-anywhere, which is no longer available, so I created a nodejs lambda function in AWS triggered by an API Gateway. This is the lambda function if you ever want to do this yourself:
```javascript
const https = require('https');
exports.handler = async (event) => {
    let dataString = '';
    
    const response = await new Promise((resolve, reject) => {
      var district = event.queryStringParameters.district;
        const req = https.get("https://www.toastmasters.org/api/sitecore/FindAClub/Search?advanced=1&latitude=1&longitude=1&district=" + district, function(res) {
          res.on('data', chunk => {
            dataString += chunk;
          });
          res.on('end', () => {
            resolve({
                statusCode: 200,
                body: dataString
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });
    
    return response.body;
};
```
The reference to the Toastmasters FindAClub API is hardcoded so that the function doesn't start getting use from random people on the internet.

See it in action here: https://4562kgf09e.execute-api.us-west-2.amazonaws.com/default/search-clubs?district=73
