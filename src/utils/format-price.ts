
export const formattedPrice = (price: number | bigint | any) => {
    price = Number(price)
    const format = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);

    return format.replace('Rp', 'Rp.').toString();
} 