export default function roundDecimal(num: number) {
    const numStr = num.toString();
    const splittedNumStr = numStr.toString().split('.');
    const decimalNum = splittedNumStr[1].length;

    if (decimalNum > 2) { return parseFloat((Math.round(num * 100) / 100).toFixed(2)); }
    return num;
}