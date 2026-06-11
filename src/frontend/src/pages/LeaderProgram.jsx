import React, { useState } from "react";
import LeaderTable from "@/myComponents/Tables/LeaderTable";
import DashCard from "../myComponents/DashCard";

const LeaderProgram = () => {
	const [myPrograms, setMyPrograms] = useState([]);

	return (
		<>
			<div className="px-5 pt-5 pb-2">
				<h1 className="text-3xl font-extrabold gradient-text">Programs</h1>
				<p className="text-white/40 text-sm mt-1">Your assigned programs</p>
			</div>

			{myPrograms.length > 0 && (
				<div className="w-[95%] mx-auto mb-3 space-y-5">
					{myPrograms.map((program) => (
						<div key={program.ProgramId}>
							<p className="text-white/70 text-sm font-semibold mb-2 uppercase tracking-wide">
								{program.Name}
							</p>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
								<DashCard name="Total Programs" account="1" index={0} />
								<DashCard name="Total Beneficial" account={program.Beneficials.toString()} index={1} />
								<DashCard name="Total Served" account={program.Citizens.length.toString()} index={2} />
							</div>
						</div>
					))}
				</div>
			)}

			<div className="w-[95%] mx-auto">
				<LeaderTable setMyPrograms={setMyPrograms} />
			</div>
		</>
	);
};

export default LeaderProgram;
