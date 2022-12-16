import { json } from "@sveltejs/kit"

type InvalidFormValues = {
    error: string,
    fields: {
        name: string,
        message: string
    }[]
}

type InvalidFormValuesResponse = {
    response: InvalidFormValues,
    headers: {
        status: number
    }
}

type InvalidFormField = {
    name: string,
    message: string
}
export function errorInvalidFormMessage(fields: InvalidFormField[], status: number): InvalidFormValuesResponse {
    return {
        response: {
            error: "Invalid form values.",
            fields
        },
        headers: {
            status: 404
        }
    }

}