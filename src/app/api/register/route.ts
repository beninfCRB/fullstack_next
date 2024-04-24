import { register } from "@/actions/register"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()

    const data = await register(body)

    return NextResponse.json(data, { status: 200 })
}

