// form submit event handler
const formSubmissionHandler = async (event) => {
  event.preventDefault();

  // get the form attributes from event.target object
  const formElement = event.target,
    { action, method } = formElement,
    body = new FormData(formElement);

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
    const res = await fetch(action, { method, body });
    const jsonRes = await res.json();

    const {
      isSuccess,
      message,
      validationError,
    } = normalizeContactForm7Response(jsonRes);

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
    return handleFormSubmissionError(loading, validationError, formElement);
  } catch (error) {
    console.log(error);
    removeSubmitButtonSpinner(loading);

    // display custom error message for other api exceptions
    messageNode = document.getElementById("error");
    messageNode.innerText = "Something went wrong, try again.";
    messageNode.style.padding = "10px 0px";
  }
};

// form blur event handler
const formBlurEventHandler = (event) => {
  if (event.target.value.length > 0) {
    event.target.style.border = "1px solid #198754";
  }
};

// format errors from api response
const normalizeContactForm7Response = (response) => {
  // The other possible statuses are different kind of errors
  const isSuccess = response.status === "mail_sent";
  // A message is provided for all statuses
  const message = response.message;
  const validationError = isSuccess
    ? {}
    : // We transform an array of objects into an object
      Object.entries(
        response.invalid_fields.map((error) => {
          // Extracts the part after "cf7-form-control-wrap"
          const key = /cf7[-a-z]*.(.*)/.exec(error.into)[1];

          return [key, error.message];
        })
      );

  return {
    isSuccess,
    message,
    validationError,
  };
};

// handle error submission
const handleFormSubmissionError = (loading, validationError, formElement) => {
  removeSubmitButtonSpinner(loading);

  let inputElement;
  validationError.forEach(([i, errorRes]) => {
    const error = {
      htmlField: errorRes[0],
      errorMsg: errorRes[1],
    };

    inputElement = formElement[error.htmlField];

    inputElement.style.border = "2px solid #dc3545";
  });
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
