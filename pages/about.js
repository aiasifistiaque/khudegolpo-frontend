import React from 'react';
import Page from '../components/utilities/page/Page';
import PageInnerLayout from '../components/utilities/container/PageInnerLayout';

const about = () => {
	return (
		<Page>
			<PageInnerLayout>
				<h5>MEET Khudegolpo</h5>
				<br />

				<p>
					Khude GOlpo is a storytelling platform designed for the publication of
					e-books, with a veiw to creating a hub for readers and writers alike,
					where they can easily access published contents.
				</p>

				<h6>THE FOUNDING</h6>

				<p>
					As an avid reader, Asif Hossain realised that reading books sent
					through WhatsApp and various other groups, though enjoyable, often
					times is beset with it&apos;s own challenges. Recalling a situation
					where an author had to announce on a group chat where she pasted her
					books, that the rest chapters are to be paid for, and provide her bank
					details for readers to make the payment, Umar insisted that was not
					the best way to go about selling and sharing one&apos;s contents, and
					in a bid to address this lapse, his research led to the birthing of
					Khude Golpo.
				</p>

				<h6> A BRIEF HISTORY </h6>

				<p>
					The developmental process of Khude Golpo officially started on
					January, 2021, and completed in May, 2021. Umar had initially chose
					the name {`"Hausa Bookstore"`}, until a number of reviews, feedback
					and suggestions from users inspired an upgrade which led to a total
					overhauling of the platform&apos;s design and brand name into what you
					have today, {`"Khudegolpo PUBLISHERS"`}. He finalized this process in
					August, completed the paper works in November and plans to launched in
					December, 2021.
				</p>

				<p>Please stay tuned and spread the word!</p>
			</PageInnerLayout>
		</Page>
	);
};

export default about;
