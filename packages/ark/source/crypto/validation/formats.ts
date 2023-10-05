import { maxVendorFieldLength } from "../utils.js";

export const vendorField = (data: string) => {
	try {
		return Buffer.from(data, "utf8").length <= maxVendorFieldLength();
	} catch {
		return false;
	}
};
