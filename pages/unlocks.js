import React, { useState, useEffect } from 'react';
import Page from '../components/utilities/page/Page';
import useHistoryApi from '../hooks/useHistoryApi';
import LoadingPage from '../components/utilities/page/LoadingPage';
import PageCard from '../components/payment/refill/PageCard';
import Row from '../components/utilities/container/Row';
import RowItemContainer from '../components/utilities/container/RowItemContainer';
import RowItem from '../components/utilities/container/RowItem';
import PageSelector from '../admin/PageSelector';
import { useRouter } from 'next/dist/client/router';

const PageUnlocks = () => {
	const router = useRouter();
	const [onPage, setOnPage] = useState(1);
	const [initialize, setInitialze] = useState(false);
	const [sort, setSort] = useState('-createdAt');
	const { doc, loading, error, count, pages, page } = useHistoryApi({
		target: 'unlock',
		page: onPage,
		query: `sort=${sort}&perpage=10`,
	});

	useEffect(() => {
		if (!loading) {
			setInitialze(true);
		}
	}, [loading]);

	if (!initialize) return <LoadingPage />;
	if (error) return <h1>{error}</h1>;
	return (
		<Page>
			<PageCard>
				<h5>Purchases</h5>
				{doc.map(i => (
					<RowItemContainer key={i._id}>
						<RowItem>
							{i.book.title}: {i.chapter.title}
						</RowItem>
						<RowItem tag>{i.price}BDT</RowItem>
					</RowItemContainer>
				))}
				<PageSelector page={page} pages={pages} setOnPage={e => setOnPage(e)} />
			</PageCard>
		</Page>
	);
};

export default PageUnlocks;
