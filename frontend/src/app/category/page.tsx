import { getColorCode } from "@/domain/payment-category";
import { findPaymentCategoriesByUserId } from "@/infrastructure/persistence/payment-category-repository";
import { connection } from "next/server";
import { ColorPallet } from "./colors";

export default async function Page() {
	await connection();
	const paymentCategories = await findPaymentCategoriesByUserId("user-id-a");

	return (
		<div>
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
		</div>
	);
}
