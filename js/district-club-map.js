var mapSelector = '#district-club-map';


DistrictClubMap.prototype = {
    googleMapsAPIKey: null,
    district : null,
    corsProxy: 'https://cors-anywhere.herokuapp.com/'
};


function DistrictClubMap() {}


var params
function setMapParameters(mapParams) {
    params = mapParams;
}


$(document).ready(function () {
    getClubInfo();
    $('body').append(
        $('<script>', {
            src:'https://maps.googleapis.com/maps/api/js?key='
                + params.googleMapsAPIKey
                + '&callback=clubMap'}));
});


var clubInfo;
function getClubInfo() {
    console.log('getting club info');
    var url = 'https://www.toastmasters.org/api/sitecore/FindAClub/Search'
    $.get(
        params.corsProxy + url,
        {
            district: params.district,
            advanced: 1,
            latitude: 1, // breaks when zero or missing
            longitude: 1, // breaks when zero or missing
        },
        function(data) {
            console.log('Club information retrieved for District ' + params.district);
            clubInfo = data;
            console.log('yaya! we got the club info');
        },
        'json'
    );
}


function clubMap() {
    if (clubInfo !== undefined) {
        var mapCenter = getCenter(clubInfo);
        var mapProperties = {
            center: new google.maps.LatLng(mapCenter.latitude, mapCenter.longitude),
            zoom: 5
        }
        var map = new google.maps.Map($(mapSelector)[0], mapProperties);

        addClubMarkers(map);
        return;
    }
    setTimeout(clubMap, 1000);
}


function addClubMarkers(map) {
    for (var i = 0; i < clubInfo.Clubs.length; i++) {
        new google.maps.Marker({
            position: new google.maps.LatLng(clubInfo.Clubs[i].Address.Coordinates.Latitude,
                                             clubInfo.Clubs[i].Address.Coordinates.Longitude)
        }).setMap(map);
    }
}


function getCenter(clubInfo) {
    //TODO: implement this for the given club info
    return { latitude: -38, longitude: 142 };
}