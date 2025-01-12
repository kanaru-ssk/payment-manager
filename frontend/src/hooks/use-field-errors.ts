import type { FormState } from "@/lib/form-state";
import { useEffect } from "react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export function useFieldErrors<TFieldValues extends FieldValues>(
	state: FormState<unknown, TFieldValues>,
	setError: UseFormSetError<TFieldValues>,
) {
	useEffect(() => {
		if (state && !state.success) {
			for (const [key, value] of Object.entries(state.errors.fieldErrors) as [
				Path<TFieldValues>,
				string[] | undefined,
			][]) {
				if (value?.[0]) setError(key, { message: value[0] });
			}
		}
	}, [state, setError]);
}
