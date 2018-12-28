$(document).ready(function () {
    createAndShowMap();
});

function createAndShowMap() {
    getClubInformation();
}

function getClubInformation() {
    $.get(
        url: "https://www.toastmasters.org/api/sitecore/FindAClub/Search",
        data: {
            district : DistrictClubMap.options.district,
            advanced : 1,
            latitude : 1, // breaks when zero or missing
            longitude : 1, //breaks when zero or missing
        }
    }
);
    var toastmastersAPIcall="https://www.toastmasters.org/api/sitecore/FindAClub/Search?district=73&advanced=1&latitude=1&longitude=1"
}

var DistrictClubMap.options = {
    district : null
}
