# district-club-map
This small JavaScript Project has been created to Toastmasters around the world to visualise how their District is organised geographically.

## How to Install:

1. Register for a Google Maps API key and restrict it for use on the domain of your website.

2. Add this element in the place where you want the map to be displayed:
```html
<div id='district-club-map'></div>
```

3. Import any version of jQuery, if your web page doesn't already load one:
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
```

4. Import the desired verion of this file: https://github.com/stabbystabstab/district-club-map/blob/master/js/district-club-map.js
  You can save it as a resource and load it from your application server, or you can load it from github using a service like jsdeliver:
  ```html
<script src="https://cdn.jsdelivr.net/gh/stabbystabstab/district-club-map@0.1/js/district-club-map.js"></script>
````

4. Add this JS somewhere on the same page, specifying your Google Maps API Key:
```javascript
  var mapParameters = new DistrictClubMap();
  mapParameters.district = 73; //Your district number
  mapParameters.startingZoom = 5; //optional parameter, default = 5, play with it to see what works for your District's size
  mapParameters.googleMapsAPIKey = 'YOUR GOOGLE MAPS API KEY GOES HERE';
  setMapParameters(mapParameters);
```

5. And you're done.

6. Example here (it's my book blog, do not read!): http://www.bookninja.org/index.php/toastmasters-club-map-district-73/

## TLDR;
Copy and paste this, just specify your district and Google Maps API key:
```html
<div id='district-club-map'></div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/stabbystabstab/district-club-map@0.1/js/district-club-map.js"></script>
<script>
  var mapParameters = new DistrictClubMap();
  mapParameters.district = 73; // YOUR DISTRICT NUMBER GOES HERE
  mapParameters.googleMapsAPIKey = 'YOUR GOOGLE MAPS API KEY GOES HERE';
  setMapParameters(mapParameters);
</script>
```


P.S. My JavaScript isn't great, so please make a pull request if you think you can improve this!!


