/****************************
 * Prototype functions
 */


// date prototype function
if (!Date.prototype.format_date) {
	Date.prototype.format_date = function (format) {
		var dateInfo = {},
			monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

		dateInfo["Y"] = this.getFullYear();
		dateInfo["y"] = dateInfo["Y"].toString().substring(2, 2);
		dateInfo["M"] = this.getMonth() + 1;
		dateInfo["m"] = dateInfo["M"] < 9 ? "0" + dateInfo["M"] : dateInfo["M"]; // getMonth() is zero-based
		dateInfo["D"] = this.getDate();
		dateInfo["d"] = dateInfo["D"] < 10 ? "0" + dateInfo["D"] : dateInfo["D"];
		dateInfo["H"] = this.getHours();
		dateInfo["h"] = dateInfo["H"] < 10 ? "0" + dateInfo["H"] : dateInfo["H"];
		dateInfo["I"] = this.getMinutes();
		dateInfo["i"] = dateInfo["I"] < 10 ? "0" + dateInfo["I"] : dateInfo["I"];
		dateInfo["S"] = this.getSeconds();
		dateInfo["s"] = dateInfo["S"] < 10 ? "0" + dateInfo["S"] : dateInfo["S"];
		dateInfo["N"] = monthName[this.getMonth()];
		dateInfo["n"] = monthName[this.getMonth()].substring(0, 3);
		dateInfo["W"] = dayName[this.getDay()];
		dateInfo["w"] = dayName[this.getDay()].substring(0, 3);

		for (var i in dateInfo) {
			var reg = new RegExp(i, "g");
			format = format.replace(reg, dateInfo[i]);
		}

		return format;
	};
}

// date prototype function
if (!String.prototype.regulate) {
	String.prototype.regulate = function (len, symbols) {
		return len > 3 && this.length > len? this.substring(0, len - 3) + (symbols || "..."): this;
	};
}
