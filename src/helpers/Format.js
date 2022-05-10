const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const formatLocation = (loc) => {
    return loc.address ? loc.address : `${loc.longtitude}x${loc.latitude}`;
};

const formatUsername = (user) => {
    return `${user.firstName} ${user.lastName}`;
};

const formatDateMonth = (date) => {
    return months[date.getMonth()];
};

const formatDateMonthDay = (date) => {
    return date.getDate() + ' ' + formatDateMonth(date);
};

const formatFullDate = (date) => {
    return date.toISOString();
};

export {
    months,
    formatLocation,
    formatUsername,
    formatDateMonth,
    formatDateMonthDay,
    formatFullDate,
};
