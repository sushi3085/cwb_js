module.exports = {
    RADARUrl : "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0059-001?Authorization=CWB-41DC9AED-4979-4F29-8CB7-E6BF577E5036&downloadType=WEB&format=JSON",
    rainUrl : "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-B0045-001?Authorization=CWB-41DC9AED-4979-4F29-8CB7-E6BF577E5036&downloadType=WEB&format=JSON",
    getXY: function getXY(longitude, latitude) {
        longArr = longitude.split(" ");
        long = +longArr[0];
        long += (+longArr[1]) / 60;
        longGrid = long / 0.0125;
        longGrid = Math.round(longGrid);

        latArr = latitude.split(" ");
        lat = +latArr[0];
        lat += latArr[1]/60;
        latGrid = Math.round(lat/0.0125);

        return [longGrid, latGrid]
        // return (longitude-115.0,latitude-18.0)/0.0125
    },

    getZR: function(dBZ){
        // Z = 300(R)^1.4
        let A = 32.5;
        let B = 1.65;
        // Z = 10^(dBZ/10)
        let Z = Math.pow(10, dBZ/10.0)
        return 6*Math.pow(Z/A, 1/B);
    },
}

