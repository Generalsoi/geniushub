// form submit event handler
const formSubmissionHandler = async (event) => {
  event.preventDefault();

  // get the form attributes from event.target object
  const formElement = event.target,
    body = new FormData(formElement);

  const emailFrom = formElement["email"].value;
  // const emailTo = "5eb608be1c-ed10aa@inbox.mailtrap.io";
  const emailTo = "contact@geniushubglobal.com";

  const loadingBtnID = pageHasMoreForms()
    ? formElement?.id === "form1"
      ? "btnLoading"
      : "btnLoading2"
    : "btnLoading";
  const loading = document.getElementById(loadingBtnID);

  // clear error or success message
  clearServerResponseMessage(formElement);
  // display spinner
  displaySubmitButtonSpinner(loading);

  try {
    const { isSuccess, message } = await sendEmail(
      formElement,
      body,
      emailFrom,
      emailTo
    );

    // set the form submission response message
    displayServerResponseMessage(formElement, isSuccess, message);

    if (isSuccess) {
      // reset the input borders
      [...formElement.elements].forEach((f) => {
        f.style.border = "1px solid #c3c3c3";
      });
      removeSubmitButtonSpinner(loading);

      // display success modal
      document.getElementById("successBtn").click();

      // close if modal form
      const closeBtnID = pageHasMoreForms()
        ? formElement.id === "form1"
          ? "closeOnSuccess"
          : "closeOnSuccess2"
        : "closeOnSuccess";

      const modalFormCloseBtn = document.getElementById(closeBtnID);
      modalFormCloseBtn && modalFormCloseBtn.click();
      return formElement.reset();
    }

    // if not successful return the error handler
    return handleFormSubmissionError(loading);
  } catch (error) {
    handleFormSubmissionError(loading);
  }
};

// form blur event handler
const formBlurEventHandler = (event) => {
  if (event.target.value.length > 0) {
    event.target.style.border = "1px solid #198754";
  } else if (event.target.value.length === 0) {
    event.target.style.border = "1px solid #fc9d9d";
  }
};

// format errors from api response
const sendEmail = async (formElement, formDataEntries, emailFrom, emailTo) => {
  const emailSubject = pageHasMoreForms()
    ? formElement?.id === "form1"
      ? "Genius Hub Trainee Application"
      : "Genius Hub Sponsor Application"
    : document.title;

  let htmlEmailBody = "";

  formDataEntries.forEach(
    (value, key) =>
      (htmlEmailBody += `<p>${key.toUpperCase()}:&nbsp;&nbsp;<b>${value}</b></p>`)
  );

  const response = await Email.send({
    SecureToken: "0e94233e-d69f-4e85-bdf7-9652b199f5f5",
    To: emailTo,
    From: emailFrom,
    Subject: `Contact Form Response (${emailSubject})`,
    Body: htmlEmailBody,
  });

  const isSuccess = response === "OK";

  const message = "Thank you for contacting us.";

  return {
    isSuccess,
    message,
  };
};

// handle error submission
const handleFormSubmissionError = (loading) => {
  removeSubmitButtonSpinner(loading);

  // display custom error message for other api exceptions
  messageNode = document.getElementById("error");
  messageNode.innerText =
    "Something went wrong, please fill the form fields correctly and try again.";
  messageNode.style.padding = "10px 0px";
};

// display server response messages
const displayServerResponseMessage = (formElement, isSuccess, message) => {
  const messageHTMLNodeId = isSuccess
    ? "success"
    : pageHasMoreForms()
    ? formElement?.id === "form1"
      ? "error"
      : "error2"
    : "error";

  messageNode = document.getElementById(messageHTMLNodeId);
  messageNode.innerText = message;
  messageNode.style.padding = "10px 0px";
};
// clear server response messages
const clearServerResponseMessage = (formElement) => {
  const errorMessageHTMLNodeId = pageHasMoreForms()
    ? formElement?.id === "form1"
      ? "error"
      : "error2"
    : "error";

  document.getElementById(errorMessageHTMLNodeId).innerText = "";
  document.getElementById("success").innerText = "";
};

const displaySubmitButtonSpinner = (loading) => {
  // add spinner
  loading.style.display = "inline-block";

  // disable button
  const submitBtnID = pageHasMoreForms() ? "submitBtn2" : "submitBtn";
  document.getElementById(submitBtnID).disabled = true;
};

const removeSubmitButtonSpinner = (loading) => {
  // remove spinner
  loading.style.display = "none";
  // enable button
  const submitBtnID = pageHasMoreForms() ? "submitBtn2" : "submitBtn";
  document.getElementById(submitBtnID).disabled = false;
};

// handle instance when two forms are in one page
const handleMultipleForm = (multipleFormElements) => {
  multipleFormElements.forEach((formElement, _) => {
    formElement.addEventListener("submit", formSubmissionHandler);
    formElement.addEventListener("blur", formBlurEventHandler, true);
  });
};

const handleSingleForm = (singleFormElement) => {
  singleFormElement.addEventListener("submit", formSubmissionHandler);
  singleFormElement.addEventListener("blur", formBlurEventHandler, true);
};

// check if page has more than one form
const pageHasMoreForms = () => document.querySelector("#form2") !== null;

// main program
const main = () => {
  const multipleFormElements = document.querySelectorAll(".formID");
  const singleFormElement = document.querySelector("#form");

  if (multipleFormElements !== null && multipleFormElements.length > 1) {
    return handleMultipleForm(multipleFormElements);
  }
  return handleSingleForm(singleFormElement);
};

main();
