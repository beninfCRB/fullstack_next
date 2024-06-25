export const formattedDate = (date?: Date) => {
    return new Date(String(date)).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}

export const formattedDateText = (date?: Date) => {
    return new Date(String(date)).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}