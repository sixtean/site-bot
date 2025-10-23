import { userService } from "../services/user.service";

interface userFormValues {
    id: string;
}

export const userController = async (
    values: userFormValues,
    onSuccess: (data: any) => void,
    onError: (message: string) => void
) => {
    try {
        const data = await userService(values);
        onSuccess(data)
    } catch (error: any) {
        onError(error.message)
    }
}