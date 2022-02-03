'use strict';

const moment = require('moment');

class MonthService {
	static getNumber(monthName) {
		return moment().month(monthName).format("M");
	}
};

module.exports = MonthService;
