export const vendorField = (data: string) => {
	try {
		console.log("validating vendorField", data);
		return Buffer.from(data, "utf8").length <= 60;
	} catch {
		return false;
	}
};
