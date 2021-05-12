const applyForm = document.getElementById("applyForm");
const resume = document.getElementById("resume");
const coverLetter = document.getElementById("cover-letter");

// clear error message
document.getElementById("error").innerText = "";

// resume and cover data
let resumeFile, resumeDataUri;
let coverLetterFile, coverLetterDataUri;

const handleFormSubmission = async (event) => {
  event.preventDefault();

  //  set button spinner
  document.getElementById("btnLoading").style.display = "inline-block";

  // get the form attributes from event.target object
  const formElement = event.target,
    body = new FormData(formElement);

  let htmlEmailBody = "";

  body.forEach(
    (value, key) =>
      key !== "resume" &&
      key !== "cover_letter" &&
      (htmlEmailBody += `<p>${key.toUpperCase()}:&nbsp;&nbsp;<b>${value}</b></p>`)
  );

  const jobTitle = document.getElementById("jobTitle").innerHTML,
    // submissionEmail = document.getElementById("submissionEmail").innerHTML,
    emailTo = "careers@geniushubglobal.com",
    emailFrom = formElement["email"].value;

  try {
    const response = await Email.send({
      SecureToken: "0e94233e-d69f-4e85-bdf7-9652b199f5f5",
      To: emailTo,
      From: emailFrom,
      Subject: `Application for ${jobTitle}`,
      Body: htmlEmailBody,
      Attachments: [
        {
          name: resumeFile.name,
          data: resumeDataUri,
        },
        {
          name: coverLetterFile.name,
          data: coverLetterDataUri,
        },
      ],
    });

    document.getElementById("btnLoading").style.display = "none";
    if (response === "OK") {
      formElement.reset();
      document.querySelector(".btn-close").click();
      document.getElementById("successBtn").click();
      return;
    }
    document.getElementById("error").innerText =
      "Something went wrong, upload the required documents and try again.";
  } catch (error) {
    document.getElementById("btnLoading").style.display = "none";

    // display custom error message for form validation error
    messageNode = document.getElementById("error");
    messageNode.innerText = "Please upload the required documents.";
    messageNode.style.padding = "5px 0px";
  }
};

const handleResumeUpload = (event) => {
  const file = event.target.files[0];
  // show the name of file
  const resumeLabel = document.getElementById("resume_label");
  resumeLabel.innerText = file.name;
  resumeLabel.style.color = "#333";

  const reader = new FileReader();
  reader.readAsBinaryString(file);

  reader.onload = () => {
    const dataUri = "data:" + file.type + ";base64," + btoa(reader.result);

    resumeFile = file;
    resumeDataUri = dataUri;
  };
  reader.onerror = (error) => {
    console.log("there are some problems", error);
  };
};
const handleCoverLetterUpload = (event) => {
  const file = event.target.files[0];
  // show the name of file
  const coverLabel = document.getElementById("cover_label");
  coverLabel.innerText = file.name;
  coverLabel.style.color = "#333";

  const reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = () => {
    const dataUri = "data:" + file.type + ";base64," + btoa(reader.result);

    coverLetterFile = file;
    coverLetterDataUri = dataUri;
  };
  reader.onerror = (error) => {
    console.log("there are some problems", error);
  };
};

resume.addEventListener("change", handleResumeUpload);
coverLetter.addEventListener("change", handleCoverLetterUpload);
applyForm.addEventListener("submit", handleFormSubmission);
