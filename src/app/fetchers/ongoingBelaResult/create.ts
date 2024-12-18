import {BelaResultResponse} from "@/app/interfaces/belaResult";

type CreateOngoingBelaResultAPIProps = {
    result: any;
}

export async function createOngoingBelaResultAPI({result}: CreateOngoingBelaResultAPIProps): Promise<BelaResultResponse> {
    const response = await fetch(`/api/ongoing-bela-result`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...result}),
    });

    if (!response.ok) {
        throw new Error(`Failed to create bela ongoing result: ${response.statusText}`);
    }

    return response.json();
}