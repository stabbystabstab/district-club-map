# District Club Map
This small JavaScript Project has been created to help Toastmasters members from around the world visualise how their Toastmasters District is organised geographically.

## TLDR;
Copy and paste this, just specify your district and Google Maps API key:
```html
<div id="district-club-map" style="width:100%; height:600px"></div>
<script src="https://cdn.jsdelivr.net/gh/stabbystabstab/district-club-map@1.0.1/js/district-club-map.js"></script>
<script>
  var mapParameters = new DistrictClubMap();
  mapParameters.district = 73; // YOUR DISTRICT NUMBER GOES HERE
  mapParameters.googleMapsAPIKey = 'YOUR GOOGLE MAPS API KEY GOES HERE';
  setMapParameters(mapParameters);
</script>
```

## How to Install:

1. Register for a Google Maps API key and restrict it for use on the domain of your website.

2. Add this element in the place where you want the map to be displayed. Set the height appropriately:
```html
<div id="district-club-map" style="width:100%; height:600px"></div>
```
3. Import the desired verion of this file: https://github.com/stabbystabstab/district-club-map/blob/master/js/district-club-map.js
  You can save it as a resource and load it from your application server, or you can load it from github using a service like jsdeliver:
  ```html
<script src="https://cdn.jsdelivr.net/gh/stabbystabstab/district-club-map@1.0.1/js/district-club-map.js"></script>
````

4. Add this JS somewhere on the same page, specifying your Google Maps API Key:
```javascript
  var mapParameters = new DistrictClubMap();
  mapParameters.district = 73; // Your district number
  mapParameters.googleMapsAPIKey = 'YOUR GOOGLE MAPS API KEY GOES HERE';
  mapParameters.elementId = 'district-club-map'; // optional, default = 'distrcit-club-map', id of div element to create map inside of
  mapParameters.startingZoom = 5; //optional, default = 5, play with this and see what works for your District's geographical size
  setMapParameters(mapParameters);
```

And you're done.

Example here (it's my book blog and it's embarassing, so please do not read!): http://www.bookninja.org/index.php/toastmasters-club-map-district-73/


P.S. My JavaScript is pretty average, so please make a pull request if you think you can improve this!!


