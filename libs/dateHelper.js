const getSalesDates = (startDate, endDate ) => {
    if (!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
        const date = new Date();
        startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    } else if (endDate < startDate) {
        throw new Error('Invalid time period');
    }

    return {
        startDate: startDate,
        endDate: endDate
    }
};

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