export function rupeeConverter(balance: {
    balance: number;
}) {
    const format = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    });
    // @ts-expect-error this is the error
    return format.format(balance)
}