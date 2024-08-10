import {withZod} from "@rvf/zod";
import {z} from "zod";
import {useForm} from "@rvf/remix";
import {useFetcher} from "@remix-run/react";
import {action} from "~/routes/other";

export const proxyValidator = withZod(z.any());

export default function Index() {
    return (
        <MyForm></MyForm>
    );
}


const MyForm = () => {
    const fetcher = useFetcher<typeof action>()

    const data = {
        name: "",
        email: ""
    }
    const route = '/other?__route=asdfasd'


    const form = useForm({
        validator: proxyValidator,
        defaultValues: data,
        fetcher: fetcher,
        action: route,
        method: "POST",
        submitSource: "dom", // only broken with 'dom'
        encType: "application/json", // Toggle this off and it works fine
    });

    console.log(fetcher.json, fetcher.data)

    return (
        <form {...form.getFormProps()}>
            <label>
                Name
                <input name="name"/>
            </label>

            <label>
                Email
                <input name="email"/>
            </label>
            {form.error('email') && <p>{form.error('email')}</p>}

            <button type={'submit'}>Submit</button>
        </form>
    );
}
