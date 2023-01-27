module.exports = {
    transformDate: function (get_date) {
        let date = new Date(get_date);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();
        let hr = date.getHours();
        let mn = date.getMinutes();
        let sc = date.getSeconds();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if (hr < 10) {
            hr = '0' + hr;
        }
        if (mn < 10) {
            mn = '0' + mn;
        }
        if (sc < 10) {
            sc = '0' + sc;
        }
        return year + '-' + month + '-' + dt + " " + hr + ":" + mn + ":" + sc;
    }
};