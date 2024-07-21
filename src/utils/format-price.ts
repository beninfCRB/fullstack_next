
export const formattedPrice = (price: number | bigint | any) => {
    price = Number(price)
    const format = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);

    return format.replace('Rp', 'Rp. ');
} 