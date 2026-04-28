function sumOfSquares(arr) {
    if (!Array.isArray(arr)) return 0;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        if (typeof num === 'number' && !isNaN(num)) {
            sum += num * num;
        }
    }
    return sum;
}

function isEqualObj(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function diagonalSum(matrix) {
    if (!Array.isArray(matrix) || matrix.length === 0) return 0;
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        if (!Array.isArray(matrix[i]) || matrix[i].length !== n) return 0;
    }
    let total = 0;
    for (let i = 0; i < n; i++) {
        total += matrix[i][i];
        total += matrix[i][n - 1 - i];
    }
    if (n % 2 === 1) {
        const mid = Math.floor(n / 2);
        total -= matrix[mid][mid];
    }
    return total;
}

function groupAnagrams(words) {
    if (!Array.isArray(words)) return [];
    const map = new Map();
    for (const word of words) {
        const key = word.toLowerCase().split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(word);
    }
    let groups = Array.from(map.values()).filter(group => group.length > 1);
    groups = groups.map(group => group.sort());
    groups.sort((a, b) => a[0].localeCompare(b[0]));
    return groups;
}

module.exports = { sumOfSquares, isEqualObj, diagonalSum, groupAnagrams };
