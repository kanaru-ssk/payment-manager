import type { Timestamp } from "@bufbuild/protobuf/wkt";

export function toMilliseconds({ seconds, nanos }: Timestamp): number {
	return Number(seconds) * 1000 + Number(nanos) / 1000000;
}
