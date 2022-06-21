import { format } from "date-fns";

export const dateToString = (date) => {
    var tarih = new Date(date);
    var gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    var aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    return `${tarih.getDate()} ${aylar[tarih.getMonth()]} ${gunler[tarih.getDay()]}`
}
export const handleSearchUrl = (localtionSelect, categorySelect, date) => {
    const startDate = `${format(date[0].startDate, "MM/dd/yyyy")}`;
    const endDate = `${format(date[0].endDate, "MM/dd/yyyy")}`;
    return `${process.env.PUBLIC_URL}/search?localtionId=${localtionSelect}&categoryId=${categorySelect}&startDate=${startDate}&endDate=${endDate}`;
}