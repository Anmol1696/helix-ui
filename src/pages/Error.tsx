import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { FunctionComponent } from "react";

const Error: FunctionComponent =  () => {
    let error = useRouteError();
    console.error(error);
    const errorMessage = isRouteErrorResponse(error) ? error.statusText || error.data : "";
    
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{errorMessage}</i>
        </p>
      </div>
    );
};

export default Error;