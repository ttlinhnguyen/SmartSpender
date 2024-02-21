import React, {useEffect, useState} from "react";
import {MonthlyTarget} from "@/utils/MonthlyTarget";
import {useAuth0} from "@auth0/auth0-react";
import TargetApis from "../../api/TargetApis";
import EditMonthlyTarget from "./EditMonthlyTarget";
import AddMonthlyTarget from "./AddMonthlyTarget";

const MonthlyTargetIndex = () => {
  const {getAccessTokenSilently} = useAuth0();

  const [token, setToken] = useState("");
  const [targets, setTargets] = useState<Array<MonthlyTarget>>([]);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    getAccessTokenSilently().then(data => setToken(data));
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (token === "") return;

    TargetApis.getTargets(token, data => {
      if (data === null) return;
      setTargets(data);
    });
  }, [token]);

  return (
    <>
      <AddMonthlyTarget/>
      <div className="p-3">
        <h3>Monthly Targets</h3>
        <table className="table-auto border-collapse">
          <thead>
          <tr>
            <th className="border-b text-left p-3">Until</th>
            <th className="border-b text-left p-3">Amount</th>
            <th className="border-b text-left p-3"></th>
          </tr>
          </thead>
          <tbody>
          {targets.map(target =>
            <EditMonthlyTarget key={target.id} target={target} editId={editId} onChanged={() => setEditId(target.id ?? "")}/>)}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MonthlyTargetIndex;