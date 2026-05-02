import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CitizenRequestThunk } from "@/Redux/action/CitizenRequest";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";

// status: "idle" | "pending" | "enrolled"
const RequestAction = ({ data, status = "idle" }) => {
  const dispatch = useDispatch();
  const { load } = useSelector((state) => state.Citizenrequest);

  const Request = async () => {
    dispatch(CitizenRequestThunk(data));
  };

  if (status === "enrolled") {
    return (
      <Button
        className="px-4 py-2 text-xs font-semibold rounded-lg bg-web3-green/20 text-web3-green border border-web3-green/30 cursor-default"
        disabled
      >
        Enrolled
      </Button>
    );
  }

  if (status === "pending") {
    return (
      <Button
        className="px-4 py-2 text-xs font-semibold rounded-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 cursor-default"
        disabled
      >
        Pending
      </Button>
    );
  }

  return (
    <Button
      className={`relative px-6 py-2 text-white font-semibold rounded-lg transition-all ${
        load && "bg-gray-900 opacity-50 cursor-not-allowed"}`}
      type="submit"
      disabled={load}
      onClick={Request}
    >
      {load ? (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 bg-black -translate-y-1/2">
          <BeatLoader color="white" loading={load} size={10} />
        </div>
      ) : (
        "Request"
      )}
    </Button>
  );
};

export default RequestAction;
