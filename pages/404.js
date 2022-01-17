import React from 'react';
import Page from '../components/utilities/page/Page';
import TextButton from '../components/utilities/button/TextButton';
import Link from 'next/link';
import PageContainer from '../components/utilities/container/PageContainer';

const Custom404 = () => {
	return (
		<Page>
			<PageContainer>
				<h4>This Page Isn&apos;t Available</h4>
				<p style={{ maxWidth: 450, margin: '.5rem 0 1rem 0' }}>
					The link may be broken, or the page may have been removed. Check to
					see if the link you&apos;re trying to open is correct.
				</p>
				<Link href='/'>
					<TextButton bg>Go Back Home</TextButton>
				</Link>
			</PageContainer>
		</Page>
	);
};

export default Custom404;
