// format of POST request to /api/application
export class GovApplicationModel {
  personalDetails = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    address: {
      line1: "",
      line2: "",
      town: "",
      county: "",
      postcode: "",
    },
  };

  businessDetails = {
    businessName: "",
    companyNumber: "",
    businessType: "",
    businessPhone: "",
    businessEmail: "",
    businessAddress: {
      line1: "",
      line2: "",
      town: "",
      county: "",
      postcode: "",
    },
  };

  licenseDetails = {
    licenseType: "",
    premisesType: "",
    premisesAddress: {
      line1: "",
      line2: "",
      town: "",
      county: "",
      postcode: "",
    },
    activities: [] as string[],
    operatingHours: {} as Record<string, string>,
  };

  declaration: boolean | string = false;
}
