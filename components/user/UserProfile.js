import React from 'react';
import styles from './Profile.module.css';
import TextButton from '../utilities/button/TextButton';
import { colors } from '../../constants/styles';
import { useSelector, useDispatch } from 'react-redux';
import { unFollowAction, followAction } from '../../store/mix/followStore';

const UserProfile = ({ user, books, follow }) => {
	if (!user) return null;
	return (
		<div className={styles.container}>
			<ImageItemContainer>
				<ImageContainer>
					<img
						src={user?.image ? user.image : '/book/pp.png'}
						alt={user?.username}
					/>
				</ImageContainer>
				<DetailContainer>
					<div className={styles.followContainer}>
						<h5 className={styles.username}>{user?.username}</h5>
						<FollowButton follow={follow} user={user} />
					</div>

					<ItemContainer>
						<Item title={'Books'}>{books}</Item>
						<Item title={'Followers'}>{user?.followers}</Item>
						<Item title={'Following'}>{user?.followings}</Item>
					</ItemContainer>

					<h6>{user?.name}</h6>
					<p>{user?.description}</p>
				</DetailContainer>
			</ImageItemContainer>
		</div>
	);
};

const FollowButton = ({ follow, user }) => {
	const { loading } = useSelector(state => state.follow);
	const dispatch = useDispatch();

	if (loading || follow == 3)
		return (
			<TextButton bg style={{ margin: 0 }}>
				loading...
			</TextButton>
		);
	if (follow == 0)
		return (
			<TextButton
				bg
				style={{ margin: 0 }}
				onClick={() =>
					dispatch(followAction({ id: user._id, username: user.username }))
				}>
				Follow
			</TextButton>
		);
	if (follow == 1)
		return (
			<TextButton
				bg
				style={{ margin: 0 }}
				color={colors.danger}
				onClick={() =>
					dispatch(unFollowAction({ id: user._id, username: user.username }))
				}>
				Unfollow
			</TextButton>
		);
	return null;
};

const Item = ({ title, children }) => {
	return (
		<div className={styles.item}>
			<h6>{children}</h6>
			<p>{title}</p>
		</div>
	);
};

const ItemContainer = ({ children }) => {
	return <div className={styles.items}>{children}</div>;
};

const ImageItemContainer = ({ children }) => {
	return <div className={styles.imageItems}>{children}</div>;
};

const ImageContainer = ({ children }) => {
	return <div className={styles.imageContainer}>{children}</div>;
};

const DetailContainer = ({ children }) => {
	return <div className={styles.detailContainer}>{children}</div>;
};

export default UserProfile;
