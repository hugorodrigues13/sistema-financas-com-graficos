import { ServerStyleSheet } from "styled-components";
import Document, { Html, Head, Main, NextScript } from "next/document";

function MyDocument() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/assets/logo.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&display=swap" 
              rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: any) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};

export default MyDocument;