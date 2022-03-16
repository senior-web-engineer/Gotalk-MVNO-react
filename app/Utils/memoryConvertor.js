exports.formatBytes = (unit, value = 0, decimals = 2) => {
    value = Number(value);
    if (value === 0) return 0;
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [ { key: 'KB',value: 1} , { key: 'MB',value: 2}, { key: 'GB',value: 3}, { key: 'TB',value: 4}];
    let degree = sizes.find(elem => elem.key === unit).value
    return parseFloat((value * Math.pow(k, degree)).toFixed(dm));
}

exports.formatUnit = (bytes, decimals = 2) => {
    bytes = Number(bytes);

    if (bytes === 0) return {
        unit: 'Bytes',
        value: 0
    };

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return {
        unit: sizes[i],
        value: parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
    };
}