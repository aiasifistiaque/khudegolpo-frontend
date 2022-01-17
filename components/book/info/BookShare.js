import React from 'react';
import { url } from '../../../constants';
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon,
	WhatsappShareButton,
	WhatsappIcon,
	TelegramShareButton,
	TelegramIcon,
} from 'next-share';
import Row from '../../utilities/container/Row';

const BookShare = ({ item, type, seo }) => {
	const link = `${url}/${type}?id=${item?._id}`;
	const title = seo?.title || '';
	const size = 24;
	if (item != undefined && type != undefined)
		return (
			<Row
				style={{
					margin: '1rem 0',
					gap: '.25rem',
				}}>
				<p style={{ fontSize: 12, marginRight: 8, fontWeight: '600' }}>
					Share:
				</p>
				<FacebookShareButton url={link} quote={title}>
					<FacebookIcon size={size} round />
				</FacebookShareButton>
				<WhatsappShareButton url={link} title={title} separator=':: '>
					<WhatsappIcon size={size} round />
				</WhatsappShareButton>
				<TelegramShareButton url={link} title={title}>
					<TelegramIcon size={size} round />
				</TelegramShareButton>
				<TwitterShareButton url={link} title={title}>
					<TwitterIcon size={size} round />
				</TwitterShareButton>
			</Row>
		);
	return null;
};

export default BookShare;
