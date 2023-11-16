function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

export function formatDate(dateNumber: number) {
    const date = new Date(dateNumber);
    return (
        [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes()),
          padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}