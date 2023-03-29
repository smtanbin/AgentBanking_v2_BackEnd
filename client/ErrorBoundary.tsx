import React, { useState } from 'react';
import ErrorPage from "./views/error-page";



const ErrorBoundary: React.FC<any> = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const [errorMassage, setErrorMassage] = useState<Error>();

    const handleErrors = (error: Error) => {
        // Update state so the next render will show the fallback UI.
        setHasError(true);
        setErrorMassage(error)
        // You can also log the error to an error reporting service
        console.error(error);
    };

    return hasError ? (
        <ErrorPage errorMassage={errorMassage} />
    ) : (
        <React.Fragment>{children}</React.Fragment>
    );
};

export default ErrorBoundary;
