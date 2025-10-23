import { loginService } from "../services/login.service";

interface LoginFormValues {
    id: string;
    password: string;
}

export const loginController = async (
    values: LoginFormValues,
    onSuccess: (data: any) => void,
    onError: (message: string) => void
) => {
    try {
        const data = await loginService(values);
        onSuccess(data)
    } catch (error: any) {
        onError(error.message)
    }
}