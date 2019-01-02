var mapSelector = "#district-club-map";

$(document).ready(function () {
    getClubInfo();
    createAndShowMap();
});

function createAndShowMap() {
    $(mapSelector).html('<div>', { id: 'googleMap',
                                   style: 'width:100%;height:100%' });
}
var clubInfo;
function getClubInfo() {
    console.log('getting club info');
    var url = 'https://www.toastmasters.org/api/sitecore/FindAClub/Search'
    $.get(
        DistrictClubMap.corsProxy + url,
        {
            district: DistrictClubMap.district,
            advanced: 1,
            latitude: 1, // breaks when zero or missing
            longitude: 1, // breaks when zero or missing
        },
        function(data) {
            console.log('Club information retrieved for District ' + DistrictClubMap.district);
            clubInfo = data;
            console.log('yaya! we got the club info');
        },
        'json'
    );
}

var DistrictClubMap = {
        district : null,
        corsProxy: 'https://cors-anywhere.herokuapp.com/'
};


function clubMap() {
    var mapCenter = getCenter(clubInfo);
    var mapProperties = {
        center: new google.maps.LatLng(mapCenter.latitude, mapCenter.longitude),
        zoom: 3
    }
    var map = new google.maps.Map($('#district-club-map'), mapProperties);
}

function getCenter() {
    return { latitude: -25, longitude: 133 };

}