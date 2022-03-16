exports.parseDate = (data) => {
    const date = {
        y: Number(data.substring(0, 4)),
        m: Number(data.substring(4, 6)) - 1,
        d: Number(data.substring(6, 8)),
        h: Number(data.substring(8, 10)),
        min: Number(data.substring(10, 12)),
        s: Number(data.substring(12)),
    };
    return new Date(date.y, date.m, date.d, date.h, date.min, date.s)
}

exports.formatDate = (data) => {
    const date = {
        y: Number(data.substring(0, 4)),
        m: Number(data.substring(4, 6)),
        d: Number(data.substring(6, 8)),
        h: Number(data.substring(8, 10)),
        min: Number(data.substring(10, 12)),
        s: Number(data.substring(12)),
    };
    const month = date.m > 9 ? date.m : "0" + date.m;
    const day = date.d > 9 ? date.d : "0" + date.d;
    const year = date.y;
    let hour = date.h > 12 ? (date.h - 12 > 9 ? date.h - 12 : "0" + date.h - 12) : (date.h > 9 ? date.h : "0" + date.h);
    const min = date.min > 12 ? date.min : "0" + date.min;
    return `${month}/${day}/${year} at ${hour}:${min} ${date.h > 12 ? 'p.m' : 'a.m'}`
}

exports.msToTime = (duration) => {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
}