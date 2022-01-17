import '../styles/style.css';
import { Provider } from 'react-redux';
import store from '../store';
import * as gt from '../lib/gtag';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	useEffect(() => {
		const handleRouteChange = url => {
			window?.gtag &&
				window.gtag('config', gt.GA_TRACKING_ID, {
					page_path: url,
				});
		};
		// const handleRouteChange = url => {
		// 	gtag.pageview(url);
		// };
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
