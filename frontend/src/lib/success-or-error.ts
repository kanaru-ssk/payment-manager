export type SuccessOrError<TData, TError> =
	| {
			success: true;
			data: TData;
	  }
	| {
			success: false;
			errors: TError;
	  };
