var _a;
(_a = document.getElementById("downloadResumeBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var resumeData = JSON.parse(localStorage.getItem("resumeData") || "{}");
    // Create a new jsPDF instance
    var doc = new jsPDF();
    // Add the resume content to the PDF
    doc.setFont("helvetica", "normal");
    doc.text("Name: ".concat(resumeData.name), 10, 10);
    doc.text("Title: ".concat(resumeData.title), 10, 20);
    doc.text("Email: ".concat(resumeData.email), 10, 30);
    doc.text("Phone: ".concat(resumeData.phone), 10, 40);
    doc.text("Location: ".concat(resumeData.location), 10, 50);
    doc.text("Education: ".concat(resumeData.education), 10, 60);
    doc.text("Experience: ".concat(resumeData.experience), 10, 70);
    // Adding skills to the PDF
    var skillsText = resumeData.skills.join(", ");
    doc.text("Skills: ".concat(skillsText), 10, 80);
    // Add Links
    var linksText = resumeData.links.join(", ");
    doc.text("Links: ".concat(linksText), 10, 90);
    // If image exists, embed it into the PDF (optional)
    if (resumeData.image) {
        var imageData = resumeData.image;
        doc.addImage(imageData, "JPEG", 10, 100, 30, 30); // Adds image at specified coordinates and size
    }
    // Save the PDF as a file
    doc.save("".concat(resumeData.name, "_resume.pdf"));
});
window.addEventListener("DOMContentLoaded", function () {
    var resumeData = JSON.parse(localStorage.getItem("resumeData") || "{}");
    if (resumeData) {
        document.getElementById("resumeName").innerText = resumeData.name || "Your Name";
        document.getElementById("resumeTitle").innerText = resumeData.title || "Your Job Title";
        document.getElementById("resumeEmail").innerText = resumeData.email || "Your Email";
        document.getElementById("resumePhone").innerText = resumeData.phone || "Your Phone";
        document.getElementById("resumeLocation").innerText = resumeData.location || "Your Location";
        document.getElementById("resumeEducation").innerText = resumeData.education || "Your Education";
        document.getElementById("resumeExperience").innerText = resumeData.experience || "Your Experience";
        var skillsList = document.getElementById("resumeSkills");
        skillsList.innerHTML = resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join('');
        var linksContainer = document.getElementById("resumeLinks");
        linksContainer.innerHTML = resumeData.links.map(function (link) { return "<a href=\"".concat(link, "\" target=\"_blank\">").concat(link, "</a>"); }).join('');
        var imageElement = document.getElementById("resumeImage");
        if (resumeData.image) {
            imageElement.src = resumeData.image;
        }
    }
    // Add toggle functionality
    var toggleSkillsBtn = document.getElementById("toggleSkillsBtn");
    var skillsSection = document.getElementById("resumeSkills");
    // Initially, show the skills section
    var skillsVisible = true;
    toggleSkillsBtn.addEventListener("click", function () {
        if (skillsVisible) {
            skillsSection.style.display = "none"; // Hide skills
            toggleSkillsBtn.innerText = "Show Skills"; // Change button text
        }
        else {
            skillsSection.style.display = "block"; // Show skills
            toggleSkillsBtn.innerText = "Hide Skills"; // Change button text
        }
        skillsVisible = !skillsVisible; // Toggle the visibility state
    });
});
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var resumeId = urlParams.get('id'); // Get the unique ID from the URL
    if (resumeId) {
        var resumeData = JSON.parse(localStorage.getItem(resumeId) || "{}");
        if (resumeData) {
            document.getElementById("resumeName").innerText = resumeData.name || "Your Name";
            document.getElementById("resumeTitle").innerText = resumeData.title || "Your Job Title";
            document.getElementById("resumeEmail").innerText = resumeData.email || "Your Email";
            document.getElementById("resumePhone").innerText = resumeData.phone || "Your Phone";
            document.getElementById("resumeLocation").innerText = resumeData.location || "Your Location";
            document.getElementById("resumeEducation").innerText = resumeData.education || "Your Education";
            document.getElementById("resumeExperience").innerText = resumeData.experience || "Your Experience";
            var skillsList = document.getElementById("resumeSkills");
            skillsList.innerHTML = resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join('');
            var linksContainer = document.getElementById("resumeLinks");
            linksContainer.innerHTML = resumeData.links.map(function (link) { return "<a href=\"".concat(link, "\" target=\"_blank\">").concat(link, "</a>"); }).join('');
            var imageElement = document.getElementById("resumeImage");
            if (resumeData.image) {
                imageElement.src = resumeData.image;
            }
        }
    }
});
window.addEventListener("DOMContentLoaded", function () {
    var editBtn = document.getElementById("editResumeBtn");
    var editModal = document.getElementById("editModal");
    var closeBtn = document.querySelector(".close");
    var saveBtn = document.getElementById("saveResumeBtn");
    var resumeData = JSON.parse(localStorage.getItem("resumeData") || "{}");
    // Populate modal fields with current data
    editBtn.onclick = function () {
        document.getElementById("editName").value = resumeData.name || "";
        document.getElementById("editTitle").value = resumeData.title || "";
        document.getElementById("editEmail").value = resumeData.email || "";
        document.getElementById("editPhone").value = resumeData.phone || "";
        document.getElementById("editLocation").value = resumeData.location || "";
        document.getElementById("editEducation").value = resumeData.education || "";
        document.getElementById("editExperience").value = resumeData.experience || "";
        document.getElementById("editSkills").value = (resumeData.skills || []).join(", ");
        document.getElementById("editLinks").value = (resumeData.links || []).join(", ");
        editModal.style.display = "flex";
    };
    closeBtn.onclick = function () {
        editModal.style.display = "none";
    };
    saveBtn.onclick = function () {
        resumeData.name = document.getElementById("editName").value;
        resumeData.title = document.getElementById("editTitle").value;
        resumeData.email = document.getElementById("editEmail").value;
        resumeData.phone = document.getElementById("editPhone").value;
        resumeData.location = document.getElementById("editLocation").value;
        resumeData.education = document.getElementById("editEducation").value;
        resumeData.experience = document.getElementById("editExperience").value;
        resumeData.skills = document.getElementById("editSkills").value.split(",").map(function (skill) { return skill.trim(); });
        resumeData.links = document.getElementById("editLinks").value.split(",").map(function (link) { return link.trim(); });
        localStorage.setItem("resumeData", JSON.stringify(resumeData));
        updateResumeDisplay();
        editModal.style.display = "none";
    };
    function updateResumeDisplay() {
        // Refresh resume display
    }
    window.onclick = function (event) {
        if (event.target === editModal) {
            editModal.style.display = "none";
        }
    };
});
