import Link from "next/link";

export default async function Home() {
	return (
		<div className="flex flex-col items-start">
			<Link className="underline" href="/signin">
				サインイン
			</Link>
			<Link className="underline" href="/signup">
				サインアップ
			</Link>
		</div>
	);
}
