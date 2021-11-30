import React, { useState } from 'react';
import './AllPage.css';

const AllPage = () => {
	const [posts, setPosts] = useState([
		{
			id: 1,
			posts: '',
			writer: '혜민',
			title: '노릇노릇',
			content: '보리전이 익어간다',
			created_at: '2021-11-22',
			modified_at: '',
			img: '../../images/bori2.jpg',
			like: 10,
			comment: 3,
		},
		{
			id: 2,
			writer: '세은',
			title: '율무야ㅠㅠ',
			content: '율무 너무 귀여워 내가 데려오고 싶다',
			created_at: '2021-11-23',
			modified_at: '',
			img: '../../images/yulmu1.jpg',
			like: 15,
			comment: 5,
		},
		{
			id: 3,
			writer: '지수',
			title: '부비',
			content: '영종도에서 부비를 잃어버렸어요',
			created_at: '2021-11-24',
			modified_at: '',
			img: '../../images/yulmu2.jpg',
			like: 21,
			comment: 10,
		},
		{
			id: 4,
			writer: '지혜',
			title: '서리태',
			content: '서리태 시크냥',
			created_at: '2021-11-25',
			modified_at: '',
			img: '../../images/ritae1.jpg',
			like: 24,
			comment: 12,
		},
	]);

	const [backgroundimgs, setBackgroundimgs] = useState([]);

	return (
		<div>
			<h1>전체보기 페이지</h1>
			<hr />
			{posts.map((post) => (
				<div class='card'>
					<div class='card-header'>
						<div class='card-header-is_closed'>
							<div class='card-header-text'> new! </div>
							{/* <div class='card-header-number'> 2 / 5 </div> */}
						</div>
						{/* <img src={post.img} alt='img' /> */}
						<img class='headerimage' src={backgroundimgs} alt='img' />
					</div>

					<div class='card-body'>
						<div class='card-body-header'>
							<h1>{post.title}</h1>
							<p>{post.content}</p>
						</div>
						<p class='card-body-description'>{post.content}</p>

						<div class='card-body-footer'>
							<i class='card-body-nickname'>{post.writer}</i>
							<i class='icon icon-like_count'></i>
							<img
								class='image'
								src={require('../../images/heart.png').default}
								alt='like'
							/>
							{post.like}
							<i class='icon icon-comments_count'></i>
							<img
								class='image'
								src={require('../../images/chat.png').default}
								alt='cmt'
							/>
							{post.comment}
							<i class='reg_date'> {post.created_at} </i>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default AllPage;
