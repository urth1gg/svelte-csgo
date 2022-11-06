type ErrorMessage = {
    error: string,
}

export const errorMessage = (error: string): ErrorMessage => {
    return {
        error
    }
}