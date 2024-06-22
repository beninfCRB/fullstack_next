import { z } from "zod"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1; // 1MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png'];

export const PromoSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, {
        message: "Is required",
    }),
    image: z.instanceof(File)
        .refine((file) => file.size <= MAX_UPLOAD_SIZE, "Ukuran gambar harus kurang dari 1MB.")
        .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "Tipe file tidak valid. Hanya JPEG dan PNG yang diperbolehkan."),
    description: z.string().min(1, {
        message: "Is required",
    }),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
}).refine((data) => data.startDate <= data.endDate, {
    message: "Tanggal mulai tidak boleh lebih besar dari tanggal akhir.",
});

export type PromoSchemaType = z.infer<typeof PromoSchema>