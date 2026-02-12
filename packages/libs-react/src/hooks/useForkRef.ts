import { type Ref, type RefCallback, type RefObject, useMemo } from 'react';

function setRef<T>(
	ref: RefObject<T | null> | ((instance: T | null) => void) | null | undefined,
	value: T | null,
): void {
	if (typeof ref === 'function') {
		ref(value);
	} else if (ref) {
		ref.current = value;
	}
}

export default function useForkRef<Instance>(
	...refs: Array<Ref<Instance> | undefined>
): RefCallback<Instance> | null {
	return useMemo(() => {
		if (refs.every((ref) => ref == null)) {
			return null;
		}

		return (instance) => {
			refs.forEach((ref) => {
				setRef(ref, instance);
			});
		};
		// biome-ignore lint/correctness/useExhaustiveDependencies: 모든 값을 의존성 배열에 넣어주고 있음
	}, refs);
}
