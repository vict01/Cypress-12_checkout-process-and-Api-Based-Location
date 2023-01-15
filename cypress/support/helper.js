export function cleanString(str) {
    return str.replace(/[^\w]/g, '').toLowerCase()
}

export function roundNumber(number) {
    return Math.round(number);
}

export function cleanNumber(number) {
    let lastLimit = number.indexOf('/')>0 ? number.indexOf('/') : number.length
    return number.substring(number.indexOf('€')+1, lastLimit);
}

export function removeContentAfterFirstDot(str) {
    let lastLimit = str.indexOf('.')>0 ? str.indexOf('.') : str.length
    return str.substring(0, lastLimit);
}