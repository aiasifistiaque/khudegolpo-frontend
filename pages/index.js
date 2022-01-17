import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Page from '../components/utilities/page/Page';

export default function Home() {
	const { loading, isLoggedIn } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (!loading) {
			if (isLoggedIn) {
				router.replace('/home');
			} else {
				router.replace('/intro');
			}
		}
	}, [loading]);

	return (
		<Page>
			<div
				style={{
					display: 'flex',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<h5>Loading...</h5>
			</div>
		</Page>
	);
}
