// console.log(parseFloat('.2'));
// const str = "23+";
// const array = str.split("+");
// // console.log("array length: ", array.length);
// for (let e of array) {
//     console.log("e: ", e);
// }

// console.log(1.0.toFixed(2));
// console.log(Number.isInteger(10));
// console.log("1".length);


// console.log(parseFloat('003'));

const parameters = ["12", "23", "34"];
const parameterStrings = parameters.reduce((prev, current, currentIndex) => {
    let temp = '';
    if (currentIndex === 1) {
        temp = "(" + prev + ", " + current + ", ";
    } else {
        const isLast = currentIndex === parameters.length - 1;
        temp = prev + current + (isLast ? "" : ", ");
    }
    if (currentIndex === parameters.length - 1) {
        temp += ")";
    }
    return temp;
});

console.log(parameterStrings);
