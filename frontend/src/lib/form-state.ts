export type FormState<TData, TFieldValues extends { [x: string]: unknown }> =
	| undefined
	| {
			success: true;
			data: TData;
	  }
	| {
			success: false;
			errors: {
				formErrors: string[];
				fieldErrors: { [P in keyof TFieldValues]?: string[] };
			};
	  };
