export const getApplications = async (validSearch: number) => {
	if (!validSearch) {
		// get all applications
		return { message: 'get all applications' };
	}
	return { message: validSearch + ' getApplications' };
};
