var mapSelector = '#district-club-map';


DistrictClubMap.prototype = {
    googleMapsAPIKey: null,
    district : null,
    corsProxy: 'https://cors-anywhere.herokuapp.com/'
};


Division.prototype = {
    name: null,
    hue: 0,
    areas: []
};


Area.prototype = {
    name: null,
    lightness: 0
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
    var url = 'https://www.toastmasters.org/api/sitecore/FindAClub/Search';
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
        initialiseDistrictData();
        initialiseColours();
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
                                             clubInfo.Clubs[i].Address.Coordinates.Longitude),
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: getColour(clubInfo.Clubs[i]),
                fillOpacity: 0.6,
                strokeOpacity: 0.0,
            },
        }).setMap(map);
    }
}


function getCenter(clubInfo) {
    //TODO: implement this for the given club info
    return { latitude: -38, longitude: 142 };
}


function getColour(club) {
    var hue = getDivisionHue(club);
    var lightness = 0.5; // getAreaLightness(club);
    var saturation = 1;
}

Division(name) {
    this.name = name;
}

Division[] divisions = [];
Area[] areas = [];
function initialiseDistrictData() {
    for (var i = 0; i < clubInfo.Clubs.length; i++) {
        Division division = new Division();
        division.name = clubInfo.Clubs[i].Classification.Division.name;
        Area area = new Area();
        area.name = clubInfo.Clubs[i].Classification.Area.name;
        division.add(area);
        areas.add(area);
        divisions.add(division;
    }
}

function getDivision(name) {
    for (var i = 0; i < divisions.length; i++) {
        if (divisions[i].name() == name) {
            return divisions[i];
        }
    }
    return null;
}

function getArea(name) {
    for (var i = 0; i < areas.length; i++) {
        if (areas[i].name() == name) {
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

    // DIVISION HUES
    var divisionCount = divisions.length;
    for (var d = 0; d < divisionCount; d++) {
        divisions[d].hue = d * 360.0/(divisionCount + 1)
        var areaCount = divisions[d].areas.length;
        for (var a = 0; a < areaCount; a++) {
            divisions[d].areas[a] =
        }
    }

}
