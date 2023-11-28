

function timeAgo(dateString) {
    const currentDate = new Date();
    const pastDate = new Date(dateString);

    const timeDifference = currentDate - pastDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
        return 'Today';
    } else if (daysDifference === 1) {
        return '1 day ago';
    } else {
        return `${daysDifference} days ago`;
    }
}
export default timeAgo;
