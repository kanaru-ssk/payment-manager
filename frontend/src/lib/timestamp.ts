export function toMilliseconds({
	seconds,
	nanos,
}: {
	seconds: number;
	nanos: number;
}): number {
	return seconds * 1000 + nanos / 1000000;
}
