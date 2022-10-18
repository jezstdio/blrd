export function counter(ms, live) {
    let fullTime = parseInt(ms);
    let days = Math.floor(fullTime / 86400);
    let hoursLeft = Math.floor((fullTime) - (days * 86400));
    let hours = Math.floor(hoursLeft / 3600);
    let minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
    let minutes = Math.floor(minutesLeft / 60);
    let secondsLeft = Math.floor(fullTime % 60);

    function addZero(number) {
        return number < 10 ? "0" + number : number;
    }

    if (fullTime > 0 && live) {
        fullTime--;
    }

    if (fullTime >= 86400) {
        return `${addZero(days)}d ${addZero(hours)}h ${addZero(minutes)}m ${addZero(secondsLeft)}s`;
    } else if (fullTime >= 3600) {
        return `${addZero(hours)}h ${addZero(minutes)}m ${addZero(secondsLeft)}s`;
    } else if (fullTime >= 60) {
        return `${addZero(minutes)}m ${addZero(secondsLeft)}s`;
    } else if (fullTime >= 0) {
        return `${addZero(secondsLeft)}s`;
    } else if (fullTime < 0) {
        return `Ended`;
    }
}

export function dateToSec(date) {
    return (Date.parse(new Date(date)) - Date.parse(new Date())) / 1000;
}

export function dateCounter(time) {
    return counter(dateToSec(time), true);
}