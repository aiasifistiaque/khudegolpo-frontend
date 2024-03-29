import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as gtag from '../lib/gtag';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					{/* Global Site Tag (gtag.js) - Google Analytics */}

					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
					/>

					<script
						dangerouslySetInnerHTML={{
							__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${gtag.GA_TRACKING_ID}, {
              page_path: window.location.pathname,
            });
          `,
						}}
					/>

					<script
						async
						src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9981073402837221'
						crossOrigin='anonymous'></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
