import { GovApplicationModel } from "../models/2iGovApplicationModel";

export function buildValidApplication(): GovApplicationModel {
  const app = new GovApplicationModel();

  app.personalDetails = {
    firstName: "John",
    lastName: "Smith",
    dateOfBirth: "1985-03-15",
    email: "john.smith@example.com",
    phoneNumber: "07123456789",
    address: {
      line1: "123 High Street",
      line2: "",
      town: "London",
      county: "",
      postcode: "SW1A 1AA",
    },
  };

  app.businessDetails = {
    businessName: "The Red Lion",
    companyNumber: "12345678",
    businessType: "pub",
    businessPhone: "02012345678",
    businessEmail: "info@redlion.com",
    businessAddress: {
      line1: "456 Pub Street",
      line2: "",
      town: "London",
      county: "",
      postcode: "SW1A 2BB",
    },
  };

  app.licenseDetails = {
    licenseType: "premises",
    premisesType: "pub",
    premisesAddress: {
      line1: "456 Pub Street",
      line2: "",
      town: "London",
      county: "",
      postcode: "SW1A 2BB",
    },
    activities: ["sale-on", "regulated-entertainment"],
    operatingHours: {
      monday: "10:00 - 23:00",
    },
  };

  app.declaration = true;

  return app;
}
