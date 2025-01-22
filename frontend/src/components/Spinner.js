import React from "react";
import { Spinner as BootstrapSpinner } from "react-bootstrap";

function Spinner() {
  return (
    <div className="spinner">
      <BootstrapSpinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </BootstrapSpinner>
    </div>
  );
}

export default Spinner;