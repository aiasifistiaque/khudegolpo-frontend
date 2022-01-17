import React from 'react';
import styles from './Follow.module.css';
import TextCaption from '../../utilities/text/TextCaption';
import Link from 'next/link';
import TextButton from '../../utilities/button/TextButton';

const Followers = ({ count, list }) => {
	return (
		<div className={styles.container}>
			<h5>Followers</h5>
			<TextCaption>{count} Followers</TextCaption>
			<div className={styles.followers}>
				{list &&
					list.map((item, i) => (
						<Item
							name={item.user.username}
							follower={item.user.followers}
							following={item.user.followings}
							key={i}
							image={item.user.image}
						/>
					))}
			</div>
		</div>
	);
};

const Item = ({ name, follower, following, image }) => {
	return (
		<div className={styles.item}>
			<div className={styles.user}>
				<div className={styles.image}>
					<img src={image ? image : '/book/pp.png'} alt={name} />
				</div>
				<div className={styles.text}>
					<Link href={`/u/${name}`}>
						<div className={styles.name}>
							<p>{name}</p>
						</div>
					</Link>

					<div className={styles.info}>
						<TextCaption>{`${follower} Followers`}</TextCaption>
						<TextCaption>{`${following} Followings`}</TextCaption>
					</div>
				</div>
			</div>
			<Link href={`/u/${name}`}>
				<TextButton>view</TextButton>
			</Link>
		</div>
	);
};

export default Followers;
