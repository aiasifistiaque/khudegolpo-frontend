import React from 'react';
import * as gtag from '../../lib/gtag';
import Head from 'next/head';

const Ads = () => {
	return (
		<Head>
			<script
				data-ad-client={gtag.G_AD_ID}
				async
				src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${gtag.G_AD_ID}`}
				crossOrigin='anonymous'></script>
		</Head>
	);
};

export default Ads;
