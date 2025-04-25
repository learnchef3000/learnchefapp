// Copyright 2025 LearnChef3000

export const getDjangoError = data => {
  // try and parse out something more from Django's debugging screen
  let errorText = '';

  if (data.includes('exception_value')) {
    // css class from Django default debug screen
    let myDoc = new DOMParser();
    let djDoc = myDoc.parseFromString(data, 'text/html');
    let djError = djDoc.getElementsByClassName('exception_value')[0].innerText;

    errorText = `Django Debug: "${djError}"`;
  }
  return errorText;
};

export default { getDjangoError };
