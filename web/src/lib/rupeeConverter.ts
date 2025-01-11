export function rupeeConverter(balance: {
    balance: number;
}) {
    let format = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    });
    // @ts-ignore
    return format.format(balance)
}