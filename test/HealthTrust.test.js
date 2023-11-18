const { expect } = require("chai");

describe("HealthTrust Contract", function () {
  let HealthTrust;
  let healthTrust;
  let owner;
  let admin;
  let doctor;
  let patient;

  beforeEach(async function () {
    [owner, admin, doctor, patient] = await ethers.getSigners();

    // Deploy the contract
    HealthTrust = await ethers.getContractFactory("HealthTrust");
    healthTrust = await HealthTrust.deploy();
  });

  it("Should add a patient and request a medical report", async function () {
    // Add a doctor
    await healthTrust
      .connect(owner)
      .addDoctor(
        doctor.address,
        "Specialty",
        "9",
        ["monday 10pm - 12pm"],
        "4.4"
      );

    // Request a medical report
    await healthTrust
      .connect(patient)
      .requestMedicalReport(doctor.address, 123456789, "Condition", {
        value: ethers.parseEther("1"), // Send 1 ether with the request
      });

    const report = await healthTrust.medicalReports(1);
    expect(report.reportId).to.equal(1);
    expect(report.paid).to.equal(true);
    expect(report.submittedReport).to.equal(false);
    // Add more assertions based on your contract's expected behavior
  });

  it("Should submit a medical report", async function () {
    // Add a doctor
    await healthTrust
      .connect(owner)
      .addDoctor(
        doctor.address,
        "Specialty",
        "9",
        ["monday 10pm - 12pm"],
        "4.4"
      );
    // Request a medical report
    await healthTrust
      .connect(patient)
      .requestMedicalReport(doctor.address, 123456789, "Condition", {
        value: ethers.parseEther("1"), // Send 1 ether with the request
      });
    // Simulate submitting a medical report by a doctor
    await healthTrust
      .connect(doctor)
      .submitMedicalReport(1, "Summary", patient.address);

    const report = await healthTrust.medicalReports(1);
    expect(report.submittedReport).to.equal(true);
  });

  it("Should allow the patient or doctor to view a report", async function () {
    // Add a doctor
    await healthTrust
      .connect(owner)
      .addDoctor(
        doctor.address,
        "Specialty",
        "9",
        ["monday 10pm - 12pm"],
        "4.4"
      );
    // Request a medical report
    await healthTrust
      .connect(patient)
      .requestMedicalReport(doctor.address, 123456789, "Condition", {
        value: ethers.parseEther("1"), // Send 1 ether with the request
      });
    // Simulate submitting a medical report by a doctor
    await healthTrust
      .connect(doctor)
      .submitMedicalReport(1, "Summary", patient.address);

    const report = await healthTrust.medicalReports(1);

    // Simulate accessing the report details by the patient or doctor
    const decodedReport = await healthTrust
      .connect(patient)
      .decodeMedical(1, report.summaryHash);
    // Assert decoded report details
    expect(decodedReport.reportID).to.equal(1);
  });

  it("Should allow only the owner to add and remove admins", async function () {
    // Add an admin
    await healthTrust.connect.addAdmin(admin.address);

    const allAdmins = await healthTrust.getAllAdmins();
    expect(allAdmins).to.include(admin.address);

    // Remove the admin
    await healthTrust.removeAdmin(admin.address);

    const updatedAdmins = await healthTrust.getAllAdmins();
    expect(updatedAdmins).to.not.include(admin.address);
  });

  it("Should allow only the owner to add and remove doctors", async function () {
    // Add a doctor
    await healthTrust.addDoctor(
      doctor.address,
      "Specialty",
      "9",
      ["monday 10pm - 12pm"],
      "4.4"
    );

    const allDoctors = await healthTrust.getAllDoctors();
    expect(allDoctors).to.include(doctor.address);

    // Remove the doctor
    await healthTrust.removeDoctor(doctor.address);

    const updatedDoctors = await healthTrust.getAllDoctors();
    expect(updatedDoctors).to.not.include(doctor.address);
  });

  it("Should allow only the doctor to withdraw payment for a submitted report", async function () {
    // Add a doctor
    await healthTrust
      .connect(owner)
      .addDoctor(
        doctor.address,
        "Specialty",
        "9",
        ["monday 10pm - 12pm"],
        "4.4"
      );
    // Request a medical report
    await healthTrust
      .connect(patient)
      .requestMedicalReport(doctor.address, 123456789, "Condition", {
        value: ethers.parseEther("1"), // Send 1 ether with the request
      });
    // Simulate submitting a medical report by a doctor
    await healthTrust
      .connect(doctor)
      .submitMedicalReport(1, "Summary", patient.address);

    // Simulate the doctor withdrawing payment for the submitted report
    await healthTrust.connect(doctor).withdraw(1);

    const report = await healthTrust.medicalReports(1);
    expect(report.amount).to.equal(0);
  });
});
