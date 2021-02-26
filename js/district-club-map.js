/**
 * District Club Map
 * Utilises an AWS API Gateway that triggers a Lambda function in order to override the CORS policy on this: https://www.toastmasters.org/api/sitecore/FindAClub/Search
 * Available for use under the MIT Licence
 * https://github.com/stabbystabstab/district-club-map
 * @author Matthew Welch - Mount Barker Toastmasters Club (1599760) - District 73
 */

DistrictClubMap.prototype = {
    elementId: 'district-club-map',
    googleMapsAPIKey: null,
    district: null,
    corsProxy: 'https://4562kgf09e.execute-api.us-west-2.amazonaws.com/default/search-clubs'
};

function DistrictClubMap() {}

var params;
var markerDepth = -5000;
var infoDepth = 5000;

function setMapParameters(mapParams) {
    params = mapParams;
}

function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(() => {
    getClubInfo();
    const googleMapsScriptElement = document.createElement('script');
    googleMapsScriptElement.src = 'https://maps.googleapis.com/maps/api/js?' +
        `key=${params.googleMapsAPIKey}&callback=clubMap`;
    document.getElementsByTagName('body')[0].appendChild(googleMapsScriptElement);
});

var clubInfo;
async function getClubInfo() {
    console.log('getting club info');

    const url = `${params.corsProxy}?district=${params.district}`;

    try {
        const response = await fetch(url);

        if (response.status !== 200) {
            console.error("Error while fetching the club information", response);
            return;
        }

        const data = await response.json();
        console.log('Club information retrieved for District ', params.district);
        clubInfo = data;

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function clubMap() {
    if (clubInfo !== undefined) {
        initialiseDistrictData();
        initialiseColours();
        var mapCenter = getCenter(clubInfo);
        var mapProperties = {
            center: new google.maps.LatLng(mapCenter.latitude, mapCenter.longitude),
            zoom: 5
        }
        var map = new google.maps.Map(document.getElementById(params.elementId), mapProperties);

        addClubMarkers(map);
        return;
    }
    setTimeout(clubMap, 1000);
}

function addClubMarkers(map) {
    for (var i = 0; i < clubInfo.Clubs.length; i++) {
        var club = clubInfo.Clubs[i];
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(club.Address.Coordinates.Latitude,
                                             club.Address.Coordinates.Longitude),
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 15,
                fillColor: getColour(clubInfo.Clubs[i]),
                fillOpacity: 0.8,
                strokeOpacity: 0.0,
            },
            label: {
                color: getAreaLightness(getArea(getAreaName(club))) < 0.5 ? '#eeeeee' : '#111111',
                text: getAreaName(club)
            },
            infoWindow: new google.maps.InfoWindow({
                            content: formatForDisplay(club)
                        })
        });

        marker.addListener('click', function() {
            var infoWindowMap = this.infoWindow.getMap();
            this.setZIndex(markerDepth--);
            if (infoWindowMap == null || typeof infoWindowMap == "undefined") {
                this.infoWindow.open(map, this);
                this.infoWindow.setZIndex(infoDepth++);
            } else {
                this.infoWindow.close();
            }
        });
        marker.setMap(map);
    }
}

function formatForDisplay(club) {
    return club.Identification.Name
            + ' - <em>Area ' + getAreaName(club) + '</em>&nbsp;';
}

function getAreaName(club) {
  return club.Classification.Division.Name + parseInt(club.Classification.Area.Name).toString();
}

function getCenter(clubInfo) {
    var longitudeSum = 0;
    var latitudeSum = 0
    var count = 0;

    for (var i = 0; i < clubInfo.Clubs.length; i++) {
        var club = clubInfo.Clubs[i];
        var _lat = club.Address.Coordinates.Latitude;
        var _long = club.Address.Coordinates.Longitude
        if (_lat == 0 && _long == 0) {
            continue;
        }
        latitudeSum += _lat;
        longitudeSum += _long;
        count++;
    }
    if (count == 0) {
        return {latitude: 0, longitude: 0};
    }
    return {latitude: latitudeSum/count, longitude: longitudeSum/count};
}

function getColour(club) {
    var division = getDivision(club.Classification.Division.Name)
    var hue = division !== null ? division.hue : 0;
    var area = getArea(getAreaName(club));
    var lightness = getAreaLightness(area);
    var saturation = 1;
    return "hsl(" + hue + ", " + saturation * 100 + "%, " + lightness * 100 + "%)";
}

function getAreaLightness(area) {
    return area !== null ? area.lightness : 0.75;
}

function Division(name) {
    this.name = name;
}

var divisions;
var areas;
function initialiseDistrictData() {
    divisions = new Array();
    areas = new Array();
    for (var i = 0; i < clubInfo.Clubs.length; i++) {

        var division = getDivision(clubInfo.Clubs[i].Classification.Division.Name);
        if (!division) {
            division = new Object();
            division.name = clubInfo.Clubs[i].Classification.Division.Name;
            division.areas = new Array();
            divisions.push(division);
        }

        var areaName = getAreaName(clubInfo.Clubs[i])
        if (getArea(areaName) !== null) {
            continue;
        }
        var area = new Object();
        area.name = areaName;
        division.areas.push(area);
        areas.push(area);
    }
}

function getDivision(name) {
    for (var i = 0; i < divisions.length; i++) {
        if (divisions[i].name == name) {
            return divisions[i];
        }
    }
    return null;
}

function getArea(name) {
    for (var i = 0; i < areas.length; i++) {
        if (areas[i].name == name) {
            return areas[i];
        }
    }
    return null;
}

function initialiseColours() {
    if (clubInfo == undefined) {
        log('Cannot initialise colours - no club data');
        return;
    }
    var divisionCount = divisions.length;
    for (var d = 0; d < divisionCount; d++) {
        divisions[d].hue = d * 360.0/divisionCount;
        var areaCount = divisions[d].areas.length;
        for (var a = 0; a < areaCount; a++) {
            divisions[d].areas[a].lightness = 0.15 + 0.85/areaCount * a;
        }
    }
}
