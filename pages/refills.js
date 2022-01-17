import React, { useState, useEffect } from 'react';
import Page from '../components/utilities/page/Page';
import useHistoryApi from '../hooks/useHistoryApi';
import LoadingPage from '../components/utilities/page/LoadingPage';
import PageCard from '../components/payment/refill/PageCard';
import Row from '../components/utilities/container/Row';
import RowItemContainer from '../components/utilities/container/RowItemContainer';
import RowItem from '../components/utilities/container/RowItem';
import PageSelector from '../admin/PageSelector';
import { Router, useRouter } from 'next/dist/client/router';

const Pagerefills = () => {
	const [onPage, setOnPage] = useState(1);
	const router = useRouter();
	const [initialize, setInitialze] = useState(false);
	const [sort, setSort] = useState('-createdAt');
	const { doc, loading, error, count, pages, page } = useHistoryApi({
		target: 'refill',
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
				<h5>Refills</h5>
				{doc.map(i => (
					<RowItemContainer
						key={i._id}
						onClick={() => router.push(`/report?type=refill&target=${i._id}`)}>
						<RowItem date>{i.createdAt}</RowItem>
						<RowItem>{i.amount} NGN</RowItem>
						<RowItem tag>{i.status}</RowItem>
					</RowItemContainer>
				))}

				<PageSelector page={page} pages={pages} setOnPage={e => setOnPage(e)} />
			</PageCard>
		</Page>
	);
};

export default Pagerefills;
