type SuccessDTO = {
    success: boolean,
    message: string,
}

type Headers = {
    status: number,
}
export function successMessage(message: string, status: number = 200): {response: SuccessDTO, headers: Headers} {

    return {
        response: {
            success: true,
            message: message
        },
        headers: {
            status: status
        }
    }

}
