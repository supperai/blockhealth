"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function padString(input) {
    let segmentLength = 4;
    let stringLength = input.length;
    let diff = stringLength % segmentLength;
    if (!diff) {
        return input;
    }
    let position = stringLength;
    let padLength = segmentLength - diff;
    let paddedStringLength = stringLength + padLength;
    let buffer = Buffer.alloc(paddedStringLength);
    buffer.write(input);
    while (padLength--) {
        buffer.write("=", position++);
    }
    return buffer.toString();
}
exports.default = padString;
