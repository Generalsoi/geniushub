const loading = document.getElementById("btnLoading");

// form submit event handler
const formSubmissionHandler = async (event) => {
  event.preventDefault();

  // clear error or success message
  clearServerResponseMessage();
  // display spinner
  displaySubmitButtonSpinner();

  // get the form attributes from event.target object
  const formElement = event.target,
    { action, method } = formElement,
    body = new FormData(formElement);

  try {
    const res = await fetch(action, { method, body });
    const jsonRes = await res.json();

    const {
      isSuccess,
      message,
      validationError,
    } = normalizeContactForm7Response(jsonRes);

    // set the form submission response message
    displayServerResponseMessage(isSuccess, message);

    if (isSuccess) {
      // reset the input borders
      [...formElement.elements].forEach((f) => {
        f.style.border = "1px solid #c3c3c3";
      });
      removeSubmitButtonSpinner();
      return formElement.reset();
    }

    // if not successful return the error handler
    return handleFormSubmissionError(validationError, formElement);
  } catch (error) {
    removeSubmitButtonSpinner();
    // display custom error message for other api exceptions
    messageNode = document.getElementById("error");
    messageNode.innerText = "Something went wrong, try again.";
    messageNode.style.padding = "10px 0px";

    // console.log("error", error);
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
const handleFormSubmissionError = (validationError, formElement) => {
  removeSubmitButtonSpinner();

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
const displayServerResponseMessage = (isSuccess, message) => {
  const messageHTMLNodeId = isSuccess ? "success" : "error",
    messageNode = document.getElementById(messageHTMLNodeId);
  messageNode.innerText = message;
  messageNode.style.padding = "10px 0px";
};
// clear server response messages
const clearServerResponseMessage = () => {
  document.getElementById("success").innerText = "";
  document.getElementById("error").innerText = "";
};

const displaySubmitButtonSpinner = () => {
  // add spinner
  loading.style.display = "inline-block";
  // disable button
  document.getElementById("submitBtn").disabled = true;
  return loading;
};

const removeSubmitButtonSpinner = () => {
  // remove spinner
  loading.style.display = "none";
  // enable button
  document.getElementById("submitBtn").disabled = false;
};

// main program
const main = () => {
  const formElement = document.querySelector("#contact");

  formElement.addEventListener("submit", formSubmissionHandler);
  formElement.addEventListener("blur", formBlurEventHandler, true);
};

main();
