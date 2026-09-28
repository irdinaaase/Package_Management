const workstations = [
    {workstationId: 1, workstationName: "MES 10"},
    {workstationId: 2, workstationName: "MES 11"}
];

const packages={
    "MES 10":[
        {packageICN: "0506841", productionRunId: "C16724", currentlayer: 6, locationCode: "K", locationId: 54, reference: "QP247", status: "closed"},
        {packageICN: "0506842", productionRunId: "C16724", currentlayer: 3, locationCode: "K", locationId: 18, reference: "QP247", status: "open"},
        {packageICN: "0506843", productionRunId: "C16724", currentlayer: 5, locationCode: "L", locationId: 36, reference: "QP247", status: "open"},
        {packageICN: "0506844", productionRunId: "C16724", currentlayer: 6, locationCode: "M", locationId: 45, reference: "QP247", status: "open"},
        {packageICN: "0506802", productionRunId: "C16725", currentlayer: 6, locationCode: "L", locationId: 60, reference: "QP245", status: "closed"},
        {packageICN: "0506803", productionRunId: "C16725", currentlayer: 6, locationCode: "K", locationId: 60, reference: "QP245", status: "closed"},
        {packageICN: "0506322", productionRunId: "C16724", currentlayer: 6, locationCode: "K", locationId: 50, reference: "QP245", status: "open"},
        {packageICN: "0506322", productionRunId: "C16724", currentlayer: 6, locationCode: "K", locationId: 50, reference: "QP245", status: "open"},
        {packageICN: "0506322", productionRunId: "C16724", currentlayer: 6, locationCode: "K", locationId: 50, reference: "QP245", status: "open"}
    ],

    "MES 11":[
        {packageICN: "0506845", productionRunId: "C16726", currentlayer: 4, locationCode: "K", locationId: 32, reference: "QP248", status: "open"},
        {packageICN: "0506846", productionRunId: "C16726", currentlayer: 6, locationCode: "L", locationId: 47, reference: "QP248", status: "closed"},
        {packageICN: "0506847", productionRunId: "C16727", currentlayer: 2, locationCode: "M", locationId: 15, reference: "QP249", status: "open"},
        {packageICN: "0506848", productionRunId: "C16727", currentlayer: 5, locationCode: "K", locationId: 41, reference: "QP249", status: "open"},
        {packageICN: "0506849", productionRunId: "C16728", currentlayer: 6, locationCode: "L", locationId: 58, reference: "QP250", status: "closed"},
        {packageICN: "0506850", productionRunId: "C16728", currentlayer: 3, locationCode: "M", locationId: 24, reference: "QP250", status: "open"},
        {packageICN: "0506851", productionRunId: "C16729", currentlayer: 1, locationCode: "K", locationId: 12, reference: "QP251", status: "open"},
        {packageICN: "0506852", productionRunId: "C16729", currentlayer: 4, locationCode: "L", locationId: 39, reference: "QP251", status: "closed"},
        {packageICN: "0506853", productionRunId: "C16730", currentlayer: 6, locationCode: "M", locationId: 63, reference: "QP252", status: "open"}
    ]
}

let currentWorkstation = workstations[0];

const workstationNameElement = document.getElementById("workstation-name");
const changeWorkstationButton = document.getElementById("change-workstation");
const workstationSelectElement = document.getElementById("workstation-options");
const scanLabelButton = document.getElementById("scan-label");
const createPackageButton = document.getElementById("create-package");
const scanLayerButton = document.getElementById("scan-layer");        
const labelInputElement = document.getElementById("label-input");
const packageTabDetailsElement = document.getElementById("package-tab-details");

function updateWorkstationName() {
    workstationNameElement.textContent = currentWorkstation.workstationName;
}

function updatePackageTabDetails(packageList) {
    const packagesForCurrentWorkstation =
        packageList || packages[currentWorkstation.workstationName] || [];

    packageTabDetailsElement.innerHTML = "";

    packagesForCurrentWorkstation.forEach(function(packageData) {
        const packageDiv = document.createElement("div");
        packageDiv.className = "package-details";

        packageDiv.innerHTML = `
            <div class="package-top">
                <div class="package-left">
                    <div class="package-field">
                        <span>Package ICN</span>
                        <strong>${packageData.packageICN}</strong>
                    </div>

                    <div class="package-field">
                        <span>Production Run ID</span>
                        <strong>${packageData.productionRunId}</strong>
                    </div>

                    <div class="package-field">
                        <span>Current Layer</span>
                        <strong>${packageData.currentlayer}/6</strong>
                    </div>
                </div>

                <div class="package-right">
                    <div class="reference">
                        ${packageData.reference}
                    </div>

                    <div class="location">
                        <span>
                            ${packageData.locationCode}
                        </span>
                        <div class="${[18, 36, 45, 50].includes(packageData.locationId) ? "highlight-location" : ""}">
                            ${packageData.locationId}
                        </div>
                    </div>
                </div>
            </div>

            <div class="package-status ${packageData.status === 'open' ? 'open' : 'closed'}">
                ${packageData.status.toUpperCase()}
            </div>
        `;

        packageTabDetailsElement.appendChild(packageDiv);
    });
}

function loadWorkstationOptions() {
    workstationSelectElement.innerHTML = "";
    workstations.forEach(function(workstation) {
        const option = document.createElement("button");
        option.textContent = workstation.workstationName;

        option.addEventListener("click", function() {
            currentWorkstation = workstation;
            updateWorkstationName();
            updatePackageTabDetails();
            workstationSelectElement.style.display = "none";
        });
        workstationSelectElement.appendChild(option);
    });
}

changeWorkstationButton.addEventListener("click",function() {
    if (workstationSelectElement.style.display === "none") {
        workstationSelectElement.style.display = "block";
    } else {
        workstationSelectElement.style.display = "none";
    }
});

scanLabelButton.addEventListener("click", function() {
    labelInputElement.focus();
});

labelInputElement.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const labelInputValue = labelInputElement.value.trim();

        if (labelInputValue === "") {
            labelInputElement.value = "";
            packageTabDetailsElement.innerHTML = "";
            return;
        }

        const packagesForCurrentWorkstation =
            packages[currentWorkstation.workstationName] || [];

        const matchingPackages = packagesForCurrentWorkstation.filter(function(packageData) {
            return packageData.packageICN === labelInputValue;
        });

        updatePackageTabDetails(matchingPackages);
    }
});

createPackageButton.addEventListener("click", function() {
    alert("New Package Creating");
});

scanLayerButton.addEventListener( "click", function() {
    alert("Scanning Package Layer");
});

loadWorkstationOptions();
workstationSelectElement.style.display = "none";
updateWorkstationName();
updatePackageTabDetails();