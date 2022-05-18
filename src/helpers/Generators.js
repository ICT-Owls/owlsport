export function randomInt(max) {
    const d = Math.random();
    return Math.floor(d * max);
}

export function generateString(len) {
    const alpha = 'abcdefghijklmnopqrstuvwxyz';
    var res = '';
    for (var i = 0; i < len; i++) {
        res += alpha[randomInt(alpha.length)];
    }
    return res;
}
