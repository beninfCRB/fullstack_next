import { z } from "zod"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1; // 1MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png'];

export const ProductImageSchema = z.object({
    id: z.string().optional(),
    productColorId: z.string().min(1, {
        message: "Is required",
    }),
    image: z.instanceof(File)
        .refine((file) => file.size <= MAX_UPLOAD_SIZE, "Image size must be less than 1MB.")
        .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "Invalid file type. Only JPEG and PNG are allowed.")
})

export type ProductImageSchemaType = z.infer<typeof ProductImageSchema>