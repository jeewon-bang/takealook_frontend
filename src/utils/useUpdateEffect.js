import { useEffect } from 'react';
import { useRef } from 'react';

// custom hooks
export default function useUpdateEffect(fn, dependencies = []) {
	const isInitialMount = useRef(false);

	useEffect(() => {
		if (!isInitialMount.current) {
			isInitialMount.current = true;
		} else {
			return fn();
		}
	}, dependencies);
}
