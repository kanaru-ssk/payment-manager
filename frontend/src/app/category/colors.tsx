"use client";

import {
	COLOR_NAMES,
	COLOR_TONES,
	getColorCode,
} from "@/domain/payment-category";
import tailwindColors from "tailwindcss/colors";

export function ColorPallet() {
	return (
		<div className="space-y-4">
			{Object.values(COLOR_NAMES).map((colorName) => (
				<div key={colorName}>
					<h2>{colorName}</h2>
					<div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-11 gap-8 justify-center">
						{Object.values(COLOR_TONES).map((colorTone) => (
							<div key={colorTone}>
								<div
									className="w-full h-8 rounded-sm ring-neutral-500 ring-1"
									style={{
										backgroundColor: getColorCode(colorName, colorTone),
									}}
								/>
								<div className="text-sm text-neutral-500">
									{tailwindColors[colorName][colorTone]}
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
