const extractValues = (str) => {
    let lengthMatch = str.match(/L(\d+)/);
    let widthMatch = str.match(/W(\d+)/);
    let heightMatch = str.match(/H(\d+)/);
    let weightMatch = str.match(/OZ(\d+)/);

    let length = lengthMatch ? parseInt(lengthMatch[1], 10) : null;
    let width = widthMatch ? parseInt(widthMatch[1], 10) : null;
    let height = heightMatch ? parseInt(heightMatch[1], 10) : null;
    let weight = weightMatch ? parseInt(weightMatch[1], 10) : null;

    return { length, width, height, weight };
}

module.exports = extractValues;