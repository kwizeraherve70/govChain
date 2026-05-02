import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProgramLeadersThunk } from "@/Redux/action/ProgramLeader";

const ProgramLeadersModal = ({ ProgramId, count }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { loadingz, ProgramLeaders, Errorz } = useSelector(
    (state) => state.ProgramLeaders
  );

  const handleOpen = () => {
    setOpen(true);
    dispatch(ProgramLeadersThunk({ ProgramId }));
  };

  return (
    <>
      <button
        className="text-web3-purple underline hover:text-web3-accent font-medium"
        onClick={handleOpen}
      >
        {count}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[480px] bg-[#0c0d22] border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="gradient-text">Program Leaders</DialogTitle>
            <p className="text-white/40 text-xs mt-1">
              Officials responsible for this program
            </p>
          </DialogHeader>

          <div className="flex flex-col gap-2 mt-2">
            {loadingz ? (
              <p className="text-white/40 text-sm py-4 text-center">
                Loading leaders...
              </p>
            ) : !ProgramLeaders || ProgramLeaders.length === 0 || Errorz ? (
              <p className="text-white/30 py-4 text-center">
                No leaders assigned yet
              </p>
            ) : (
              ProgramLeaders.map((leader) => (
                <div
                  key={leader.ProfileId}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.07]"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-web3-accent to-web3-purple flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {leader.Fullname.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {leader.Fullname}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">{leader.Phone}</p>
                    <p className="text-white/40 text-xs">{leader.Email}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProgramLeadersModal;
