import { createTransport } from "nodemailer";

const transporter = createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "bfauzi09@gmail.com",
        pass: "qluxpakwaapmaboy",
    },
});

export async function sendVerificationEmail(
    email: string,
    token: string
) {
    const confirmLink = `${process.env.URL_SERVER}/auth/new-verification?token=${token}`

    await transporter.sendMail({
        from: "no-reply@dianrejekitoyota.com",
        to: email,
        subject: "Confirm Your Email",
        html: `<p>Click <a href=${confirmLink}>here</a> to consfirm email.</p>`
    });
}

export async function sendPasswordResetEmail(
    email: string,
    token: string
) {
    const resetPasswordLink = `${process.env.URL_SERVER}/auth/new-password?token=${token}`

    await transporter.sendMail({
        from: "no-reply@dianrejekitoyota.com",
        to: email,
        subject: "Confirm Your Email",
        html: `<p>Click <a href=${resetPasswordLink}>here</a> to reset email.</p>`
    })
}