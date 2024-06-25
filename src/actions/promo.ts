"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { PromoSchema } from "@/schemas/promo";
import { ResponseStatic } from "@/static/reponse";
import { formattedDate } from "@/utils/format-date";
import { mkdir, stat, unlink, writeFile } from "fs/promises";
import mime from 'mime';
import { join } from "path";

export async function PostPromo(values: FormData) {
    try {
        const user = await auth()
        let data = Object.fromEntries(values.entries());
        delete data.id
        const validatedFields = PromoSchema.safeParse(data)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        const image = validatedFields.data.image as File || null;

        const buffer = Buffer.from(await image.arrayBuffer());
        const relativeUploadDir = `/uploads/${formattedDate(new Date(Date.now())).replace(/\//g, "-")}`;

        const uploadDir = join(process.cwd(), "public", relativeUploadDir);

        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                return { error: "Something went wrong." }
            }
        }


        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${image.name.replace(
            /\.[^/.]+$/,
            ""
        )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;

        await writeFile(`${uploadDir}/${filename}`, buffer);
        const fileUrl = `${relativeUploadDir}/${filename}`;

        await db.promo.create({
            data: {
                name: validatedFields.data.name,
                path: fileUrl,
                description: validatedFields.data.description,
                startDate: validatedFields.data.startDate,
                endDate: validatedFields.data.endDate,
                createdBy: user?.user?.id?.toString(),
                updatedBy: user?.user?.id?.toString()
            }
        })

        return { success: ResponseStatic.Success.Insert }
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        return { error: ResponseStatic.Error.Insert }
    }
}

export async function PutPromo(id: string, values: FormData) {
    try {
        const user = await auth()
        let data = Object.fromEntries(values.entries());
        const validatedFields = PromoSchema.safeParse(data)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        const image = validatedFields.data.image as File || null;

        const buffer = Buffer.from(await image.arrayBuffer());
        const relativeUploadDir = `/uploads/${formattedDate(new Date(Date.now())).replace(/\//g, "-")}`;

        const uploadDir = join(process.cwd(), "public", relativeUploadDir);

        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                // This is for checking the directory is exist (ENOENT : Error No Entry)
                await mkdir(uploadDir, { recursive: true });
            } else {
                return { error: "Something went wrong." }
            }
        }

        const dataOld = await db.promo.findFirst({ where: { id } })

        if (!dataOld) return { error: 'data tidak ditemukan' }

        await unlink(join(process.cwd(), "public", dataOld.path))

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${image.name.replace(
            /\.[^/.]+$/,
            ""
        )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;

        await writeFile(`${uploadDir}/${filename}`, buffer);
        const fileUrl = `${relativeUploadDir}/${filename}`;

        await db.promo.update({
            where: {
                id
            },
            data: {
                name: validatedFields.data.name,
                path: fileUrl,
                description: validatedFields.data.description,
                startDate: validatedFields.data.startDate,
                endDate: validatedFields.data.endDate,
                updatedBy: user?.user.id?.toString()
            }
        })

        return { success: ResponseStatic.Success.Update }
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        return { error: ResponseStatic.Error.Update }
    }
}

export async function DeletePromo(id: string) {
    try {
        const dataOld = await db.promo.findFirst({ where: { id } })

        if (!dataOld) return { error: 'data tidak ditemukan' }

        await unlink(join(process.cwd(), "public", dataOld.path))

        await db.promo.delete({
            where: {
                id
            }
        })

        return { success: ResponseStatic.Success.Delete }
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        return { error: ResponseStatic.Error.Delete }
    }
}