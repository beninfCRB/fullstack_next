import { z } from "zod"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1; // 1MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png'];

export const ProductImageSchema = z.object({
    id: z.string().optional(),
    productColorId: z.string().min(1, {
        message: "Is required",
    }),
    image: z.any().refine((file) => {
        if (!(file instanceof File)) return false;
        return file.size <= MAX_UPLOAD_SIZE && ACCEPTED_FILE_TYPES.includes(file.type);
    }, {
        message: "Ukuran gambar harus kurang dari 1MB dan hanya JPEG dan PNG yang diperbolehkan.",
    }),
})

export type ProductImageSchemaType = z.infer<typeof ProductImageSchema>