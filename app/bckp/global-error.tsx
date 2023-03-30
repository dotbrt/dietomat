"use client";
import { useRouter } from "next/navigation";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error,
    reset: () => void,
}) {
    const router = useRouter();
    const handleError = () => {
        router.push('/');
    }

    return (
        <html>
            <head></head>
            <body>
                <div>
                    <h2>Something went wrong!</h2>
                    <button onClick={(handleError) => reset()}>Try again</button>
                </div>
            </body>
        </html>
    );
}
