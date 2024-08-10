import {unstable_defineAction} from "@remix-run/node";
import {ValidatorError} from "@rvf/remix";


export const action = unstable_defineAction(async ({request}) => {
    let email: string|undefined = undefined;
    if (request.headers.get('Content-Type') === 'application/json') {
        const data = await request.json()
        email = data.email;
    } else {
        const data = await request.formData()
        email = data.get('email')?.toString() ?? undefined;
    }

    if (email === undefined) {
        throw new Error('Email was not submitted');
    }

    return { fieldErrors: {
        email: 'This email is already taken',
        }} satisfies ValidatorError
});

