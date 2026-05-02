import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ApproveRequestThunk } from "@/Redux/action/ApproveRequest";
import { ViewRequestThunk } from "@/Redux/action/ViewRequested";
import { GetAllProgramThunk } from "@/Redux/action/GetAllProgram";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";


const ApproveAction = ({ ProgramId, ProfileId }) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const Approve = async () => {
    setLoad(true);
    try {
      await dispatch(ApproveRequestThunk({ ProgramId, ProfileId })).unwrap();
      // Refresh the request list so the approved row disappears immediately
      dispatch(ViewRequestThunk(ProgramId));
      // Refresh programs so the Citizens count updates in LeaderTable
      dispatch(GetAllProgramThunk());
    } catch (_) {
      // error already toasted inside the thunk
    } finally {
      setLoad(false);
    }
  };

  return (
    <Button
      className={`relative px-6 py-2 text-white font-semibold rounded-lg transition-all ${
        load && "bg-gray-900 opacity-50 cursor-not-allowed"}`}
      type="button"
      disabled={load}
      onClick={Approve}
    >
      {load ? (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 bg-black -translate-y-1/2">
          <BeatLoader color="white" loading={load} size={10} />
        </div>
      ) : (
        "Approve"
      )}
    </Button>
  );
};

export default ApproveAction;
