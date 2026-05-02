import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RejectRequestThunk } from "@/Redux/action/RejectRequest";
import { ViewRequestThunk } from "@/Redux/action/ViewRequested";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";


const RejectAction = ({ ProgramId, ProfileId }) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const Reject = async () => {
    setLoad(true);
    try {
      await dispatch(RejectRequestThunk({ ProgramId, ProfileId })).unwrap();
      // Refresh the request list so the rejected row disappears immediately
      dispatch(ViewRequestThunk(ProgramId));
    } catch (_) {
      // error already toasted inside the thunk
    } finally {
      setLoad(false);
    }
  };

  return (
    <Button
      className={`relative px-6 py-2 font-semibold rounded-lg transition-all bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/40 ${
        load && "opacity-50 cursor-not-allowed"}`}
      type="button"
      disabled={load}
      onClick={Reject}
    >
      {load ? (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
          <BeatLoader color="#f87171" loading={load} size={8} />
        </div>
      ) : (
        "Reject"
      )}
    </Button>
  );
};

export default RejectAction;
