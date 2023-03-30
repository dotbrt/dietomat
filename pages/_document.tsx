import { Html, Head, Main, NextScript } from 'next/document'
import 'flowbite';

export default function Document() {
    return (
        <Html lang="en" data-theme="cupcake">
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Public+Sans&display=swap"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
