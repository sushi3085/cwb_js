module.exports = {
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
    }
}

