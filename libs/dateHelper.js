'use strict';

/**
 * Get start and end dates for sales metric queries. Pass in dates in query params. If they
 * are not present in the query params then the start and end date with default to the current
 * month first and last day.
 * 
 * @param {string} startDate Start of time period
 * @param {string} endDate End of time period
 * @return {object}
 */    
const getSalesDates = (startDate, endDate ) => {
  if (startDate || endDate ) {
    if (!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
      throw new Error('Invalid Date Format');
    } else if (endDate < startDate) {
      throw new Error('Invalid time period');
    } 
  } else {
    const date = new Date();
    startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  return {
    startDate: startDate,
    endDate: endDate
  }
};

/**
 * Determine if the passed date is in the format YYYY-MM-DD
 * @param {string} date passed in date for query
 * @return {boolean}
 */    
const isValidDateFormat = (date) => {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormatRegex.test(date)) {
    return false;
  }
  return true;
}

module.exports = {
  getSalesDates
}