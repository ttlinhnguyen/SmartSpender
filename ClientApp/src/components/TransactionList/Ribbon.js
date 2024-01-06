import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import TransactionApis from "../../api/TransactionApis";

const Ribbon = ({ selectedItems, className }) => {
  const [sanitizedSelected, setSanitizedSelected] = useState([]);

  useEffect(() => {
    if (selectedItems == null) return;
    let arr = [];
    for (let key in selectedItems) {
      if (selectedItems[key]) arr.push(parseInt(key));
    }
    setSanitizedSelected(arr);
  }, [selectedItems]);

  const deleteTransactions = () => {
    TransactionApis.deleteTransactions(
      JSON.stringify(sanitizedSelected),
      () => {
        window.location.reload();
      }
    );
  };

  return (
    <div className={className}>
      <Button onClick={deleteTransactions}>Delete</Button>
    </div>
  );
};

export default Ribbon;