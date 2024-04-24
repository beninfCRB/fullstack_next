import LoginForm from "@/components/admin/auth/login/form"

export default function Component() {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg max-w-md mx-auto">
                <LoginForm />
            </div>
        </div>
    )
}

