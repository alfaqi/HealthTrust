// SPDX-License-Identifier: MIT
// HealthTrust Smart Contract

pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HealthTrust
 * @dev A smart contract for managing medical reports between patients and doctors.
 */
contract HealthTrust is Ownable {
    // Struct to store patient information
    struct Patient {
        uint256 dateOfBirth;
        address patientAddress;
        uint256 lastVisitDate;
    }

    // Struct to store doctor information
    struct Doctor {
        address doctorAddress;
        string specialty;
        uint256 perSession;
        string timeAvailability;
        string rating;
    }

    // Struct to store medical report information
    struct MedicalReport {
        uint256 reportId;
        uint256 issueDate;
        bytes patientCondition;
        bytes summaryHash;
        address doctorAddress;
        address patientAddress;
        uint256 amount;
        bool paid;
        bool submittedReport;
    }

    // Struct to store admin information
    struct Admin {
        address adminAddress;
    }

    // Mapping to store patient data
    mapping(address => Patient) public patients;

    // Mapping to store doctor data
    mapping(address => Doctor) public doctors;

    // Mapping to store medical report data
    mapping(uint256 => MedicalReport) public medicalReports;

    // Mapping to store admin data
    mapping(address => Admin) public admins;

    // Counter for medical report IDs
    uint256 public reportCount;

    // Arrays to store all doctors and admins
    address[] public allDoctors;
    address[] public allAdmins;

    // Events to log doctor and admin actions
    event DoctorAdded(address indexed doctorAddress, string specialty);
    event DoctorRemoved(address indexed doctorAddress);
    event AdminAdded(address indexed adminAddress);
    event AdminRemoved(address indexed adminAddress);
    event MedicalReportRequested(
        uint256 indexed reportId,
        address indexed patientAddress,
        uint256 amount
    );
    event MedicalReportSubmitted(
        uint256 indexed reportId,
        address indexed doctorAddress
    );

    // Modifier to restrict functions to only doctors
    modifier onlyDoctor(address account) {
        require(
            doctors[account].doctorAddress != address(0),
            "Only doctors can perform this action"
        );
        _;
    }

    // Modifier to restrict functions to only admins
    modifier onlyAdmin(address account) {
        require(
            admins[account].adminAddress != address(0),
            "Only admins can perform this action"
        );
        _;
    }

    /**
     * @dev Constructor to set the owner and initialize reportCount.
     */
    constructor() Ownable(msg.sender) {
        reportCount = 0;
    }

    /**
     * @dev Function to add a new doctor.
     * @param _doctorAddress Address of the doctor.
     * @param _specialty Specialty of the doctor.
     * @param _perSession Fee per session charged by the doctor.
     * @param _timeAvailability Availability schedule of the doctor.
     * @param _rating Rating of the doctor.
     */
    function addDoctor(
        address _doctorAddress,
        string memory _specialty,
        uint256 _perSession,
        string memory _timeAvailability,
        string memory _rating
    ) public onlyOwner {
        require(
            doctors[_doctorAddress].doctorAddress == address(0),
            "Doctor already exists"
        );
        doctors[_doctorAddress].doctorAddress = _doctorAddress;
        doctors[_doctorAddress].specialty = _specialty;
        doctors[_doctorAddress].perSession = _perSession;
        doctors[_doctorAddress].timeAvailability = _timeAvailability;
        doctors[_doctorAddress].rating = _rating;
        allDoctors.push(_doctorAddress);
        emit DoctorAdded(_doctorAddress, _specialty);
    }

    /**
     * @dev Function to remove a doctor.
     * @param _doctorAddress Address of the doctor to be removed.
     */
    function removeDoctor(address _doctorAddress) public onlyOwner {
        require(
            doctors[_doctorAddress].doctorAddress != address(0),
            "Doctor not found"
        );
        delete doctors[_doctorAddress];
        for (uint256 i = 0; i < allDoctors.length; i++) {
            if (allDoctors[i] == _doctorAddress) {
                allDoctors[i] = allDoctors[allDoctors.length - 1];
                allDoctors.pop();
                break;
            }
        }
        emit DoctorRemoved(_doctorAddress);
    }

    /**
     * @dev Function to add a new admin.
     * @param _adminAddress Address of the admin.
     */
    function addAdmin(address _adminAddress) public onlyOwner {
        require(
            admins[_adminAddress].adminAddress == address(0),
            "Admin already exists"
        );
        admins[_adminAddress] = Admin(_adminAddress);
        allAdmins.push(_adminAddress);
        emit AdminAdded(_adminAddress);
    }

    /**
     * @dev Function to remove an admin.
     * @param _adminAddress Address of the admin to be removed.
     */
    function removeAdmin(address _adminAddress) public onlyOwner {
        require(
            admins[_adminAddress].adminAddress != address(0),
            "Admin not found"
        );
        delete admins[_adminAddress];
        for (uint256 i = 0; i < allAdmins.length; i++) {
            if (allAdmins[i] == _adminAddress) {
                allAdmins[i] = allAdmins[allAdmins.length - 1];
                allAdmins.pop();
                break;
            }
        }
        emit AdminRemoved(_adminAddress);
    }

    /**
     * @dev Function to get all admin addresses.
     * @return Array of admin addresses.
     */
    function getAllAdmins() public view returns (address[] memory) {
        return allAdmins;
    }

    /**
     * @dev Function to get all doctor addresses.
     * @return Array of doctor addresses.
     */
    function getAllDoctors() public view returns (address[] memory) {
        return allDoctors;
    }

    /**
     * @dev Function for a patient to request a medical report from a doctor.
     * @param address _patientAddress Address of the patient.
     * @param _doctorAddress Address of the doctor.
     * @param _dateOfBirth Date of birth of the patient.
     * @param _patientCondition Condition description provided by the patient.
     * @param _amount Payment amount for the medical report.
     */
    function requestMedicalReport(
        address _patientAddress,
        address _doctorAddress,
        uint256 _dateOfBirth,
        string memory _patientCondition,
        uint256 _amount
    ) external {
        require(
            doctors[_doctorAddress].doctorAddress != address(0),
            "Doctor not found"
        );

        Patient storage patient = patients[_patientAddress];
        reportCount++;

        require(
            _amount >= doctors[_doctorAddress].perSession,
            "Insufficient payment"
        );

        MedicalReport storage newReport = medicalReports[reportCount];
        newReport.reportId = reportCount;
        newReport.issueDate = block.timestamp;
        newReport.doctorAddress = _doctorAddress;
        newReport.patientAddress = _patientAddress;
        newReport.summaryHash = "";
        newReport.amount += _amount;
        newReport.paid = true;

        bytes memory patientConditionHash = _encode(
            reportCount,
            _doctorAddress,
            _patientCondition
        );

        newReport.patientCondition = patientConditionHash;
        if (patient.patientAddress == address(0)) {
            patient.patientAddress = _patientAddress;
            patient.dateOfBirth = _dateOfBirth;
            patient.lastVisitDate = block.timestamp;
        }

        emit MedicalReportRequested(reportCount, _patientAddress, _amount);
    }

    /**
     * @dev Function for a doctor to submit a medical report.
     * @param _reportId ID of the medical report.
     * @param _summary Summary of the medical report.
     * @param _patientAddress Address of the patient.
     */
    function submitMedicalReport(
        uint256 _reportId,
        string memory _summary,
        address _patientAddress,
        address _doctorAddress
    ) public onlyDoctor {
        MedicalReport storage report = medicalReports[_reportId];

        require(report.reportId == _reportId, "Report not found");
        require(report.patientAddress != address(0), "Patient not found");

        report.submittedReport = true;

        bytes memory summaryHash = _encode(
            _reportId,
            _patientAddress,
            _summary
        );

        report.issueDate = block.timestamp;
        report.summaryHash = summaryHash;

        emit MedicalReportSubmitted(_reportId, _doctorAddress);
    }

    /**
     * @dev Function to decode medical report details.
     * @param _reportID ID of the medical report.
     * @param summaryHash Hash of the summary of the medical report.
     * @return reportID ID of the medical report.
     * @return _address Address of the patient.
     * @return _summary Summary of the medical report.
     */
    function decodeMedical(
        uint256 _reportID,
        address _address,
        bytes calldata summaryHash
    )
        external
        view
        returns (uint256 reportID, address _address, string memory _summary)
    {
        require(
            _address == medicalReports[_reportID].patientAddress ||
                doctors[_address].doctorAddress != address(0),
            "Access restricted"
        );

        (reportID, _address, _summary) = _decode(summaryHash);
    }

    /**
     * @dev Internal function to encode data.
     * @param reportID ID of the medical report.
     * @param _address Address of the patient or doctor.
     * @param _summary Summary of the medical report.
     * @return Encoded data.
     */
    function _encode(
        uint256 reportID,
        address _address,
        string memory _summary
    ) private pure returns (bytes memory) {
        return abi.encode(reportID, _address, _summary);
    }

    /**
     * @dev Internal function to decode data.
     * @param data Encoded data.
     * @return reportID ID of the medical report.
     * @return _address Address of the patient or doctor.
     * @return _summary Summary of the medical report.
     */
    function _decode(
        bytes memory data
    )
        private
        pure
        returns (uint256 reportID, address _address, string memory _summary)
    {
        (reportID, _address, _summary) = abi.decode(
            data,
            (uint256, address, string)
        );
    }

    /**
     * @dev Function for a doctor to withdraw the payment for a submitted medical report.
     * @param _reportID ID of the medical report.
     * @return Boolean indicating the success of the withdrawal.
     */
    function withdraw(
        uint256 _reportID,
        address _doctorAddress
    ) external returns (bool) {
        require(
            medicalReports[_reportID].doctorAddress == _doctorAddress,
            "Only doctor can withdraw"
        );
        require(
            medicalReports[_reportID].paid &&
                medicalReports[_reportID].submittedReport,
            "Invalid withdrawal conditions"
        );

        medicalReports[_reportID].amount = 0;
        return true;
    }
}
