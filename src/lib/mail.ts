import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(
    email: string,
    token: string
) {
    const confirmLink = `${process.env.URL_SERVER}/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm Your Email",
        html: `<p>Click <a href=${confirmLink}>here</a> to consfirm email.</p>`
    })
}

export async function sendPasswordResetEmail(
    email: string,
    token: string
) {
    const resetPasswordLink = `${process.env.URL_SERVER}/auth/new-password?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm Your Email",
        html: `<p>Click <a href=${resetPasswordLink}>here</a> to reset email.</p>`
    })
}