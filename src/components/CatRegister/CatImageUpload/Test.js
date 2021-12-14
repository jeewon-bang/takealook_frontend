import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Test = () => {
	const [datas, setDatas] = useState([
		{ id: 1, name: '일' },
		{ id: 2, name: '이' },
	]);

	function handleOnDragEnd(result) {
		console.log('result ? ', result);
	}

	function handleOnDragEnd(result) {
		/**
		 * 필요한 요소
		 *  드래그할 대상의 index
		 *  드래그가 끝났을때의 index
		 *
		 * 할 일
		 * 1. 드래그할 대상의 index를 지운다
		 * 2. 드래그가 끝난 당시의 index에 현재 드래그 중인 요소를 넣는다
		 */

		const currentDatas = [...datas];
		const draggingItemIndex = result.source.index; // 드래그하는 요소의 인덱스
		const afterDragItemIndex = result.destination.index; // 옮겨갈 곳의 인덱스

		const removeTag = currentDatas.splice(draggingItemIndex, 1); // 배열에서 드래그하는 요소를 잘라냄

		currentDatas.splice(afterDragItemIndex, 0, removeTag[0]); // 옮겨갈 곳의 인덱스에, 0: 아무것도 잘라내지 않고 추가함, 잘라냈던 드래그하는 요소를 집어넣는다

		setDatas(currentDatas);
	}

	return (
		<div>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId='tags' direction='horizontal'>
					{(provided) => (
						<div
							className='tags'
							{...provided.droppableProps}
							ref={provided.innerRef}>
							{datas.map(({ id, name }, index) => {
								return (
									<Draggable key={id} draggableId={`${id}`} index={index}>
										{(provided) => (
											<span
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>
												{name}
											</span>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

export default Test;
