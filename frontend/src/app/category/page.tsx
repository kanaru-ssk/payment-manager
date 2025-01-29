import { getColorCode } from "@/domain/payment-category";
import { getAuth } from "@/infrastructure/persistence/auth-store";
import { findPaymentCategoriesByUserId } from "@/infrastructure/persistence/payment-category-repository";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ColorPallet } from "./colors";

export default async function Page() {
	const auth = await getAuth();
	if (!auth) {
		return redirect("/signin");
	}
	await connection();
	const paymentCategories = await findPaymentCategoriesByUserId("user-id-a");

	return (
		<main>
			<ul>
				{paymentCategories.map((paymentCategory) => (
					<li
						key={paymentCategory.paymentCategoryId}
						className="flex items-center space-x-2"
					>
						<span
							className="h-2 w-2 inline-block"
							style={{
								backgroundColor: getColorCode(
									paymentCategory.colorName,
									paymentCategory.colorTone,
								),
							}}
						/>
						<span>{paymentCategory.paymentCategoryName}</span>
					</li>
				))}
			</ul>
			<ColorPallet />
		</main>
	);
}
