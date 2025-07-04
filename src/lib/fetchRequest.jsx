/**
 * Send a request to an API.
 * Used for requests that the status received is the main response needed.
 *
 * @param {String} apiUrl The endpoint to which to request the data.
 * @param {Object} options Configuration object for the request.
 *
 * method: ('GET') HTTP request method
 *
 * body: (null) data to be sent on the request's body
 *
 * status: (200) expected status of the request. Used for determining a failed request
 *
 * @return {Object} The response from the request. In case the request is failed or it does not have the expected status
 * (as determined in 'options') it throws an error.
 */
export const fetchRequest = async (apiUrl, options = {}) => {
  options = {
    method: "GET",
    status: 200,
    ...options,
  };

  const fetchOptions = {
    mode: "cors",
    method: options.method,
    body: JSON.stringify(options.body),
    credentials: "include",
  };
  if (options.body) {
    fetchOptions["headers"] = {
      "Content-type": "application/json; charset=UTF-8",
    };
  }

  const response = await fetch(apiUrl, fetchOptions);
  const responseJSON = await response.json();
  return responseJSON;
};
