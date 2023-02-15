import { format } from "date-fns";

export const date: Date = new Date();
export const tahun: string = format(date, "yyyy");
export const bulan: string = format(date, "MM");
export const hari: string = format(date, "dd");
export const hours: number = date.getHours();
