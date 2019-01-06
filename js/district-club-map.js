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
    var mapCenter = getCenter(clubInfo);
    var mapProperties = {
        center: new google.maps.LatLng(mapCenter.latitude, mapCenter.longitude),
        zoom: 5
    }
    var map = new google.maps.Map($(mapSelector)[0], mapProperties);

    addClubMarkers(map);
}

function addClubMarkers(map) {
    alert('Adding markers for clubs')
    for (club in clubInfo.Clubs) {
        new google.maps.Marker({ position: new google.maps.LatLng(club.latitude, club.longitude) }).setMap(map);
        alert(club.Identification.Name)
    }
}


function getCenter(clubInfo) {
    //TODO: implement this for the given club info
    return { latitude: -38, longitude: 142 };
}