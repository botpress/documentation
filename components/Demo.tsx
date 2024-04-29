import Execution from "@assets/execution.svg";
import CloseDown from "@assets/close-down.svg";
import OpenInWindow from "@assets/open-in-window.svg";
import { useState } from "react";

type Props = {
	title?: string;
	message?: string;
	example: string;
	preload?: boolean;
	file?: string
};

export const Demo = ({ example, message, title, file = 'src/App.tsx', preload = true }: Props) => {
	const [showDemo, setShowDemo] = useState(false);

	const src = `https://stackblitz.com/github/botpress/documentation-examples/tree/master/examples/${example}?embed=1&hideNavigation=1&view=both&file=${encodeURIComponent(file)}`;

	return (
		<>
			{showDemo && (
				<div
					className="top-0 bottom-0 right-0 left-0 fixed bg-gray-900 w-screen h-screen animate-[scaleout_300ms_ease] z-20"
					style={{ animationFillMode: "forwards" }}
				/>
			)}
			<div
				className={`fixed left-0 right-0 top-0 bottom-0 z-40 ${
					showDemo ? "" : "invisible"
				}`}
				onClick={() => setShowDemo(true)}
			>
				<div className="w-full h-full relative">
					<div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
						<button
							className="rounded-full w-10 h-10 bg-red-600 hover:bg-red-700 text-white shadow-md"
							onClick={(e) => {
								e.stopPropagation();
								setShowDemo(false);
							}}
						>
							<CloseDown className="h-6 w-10" />
						</button>
					</div>
					{(preload || showDemo) && (
						<iframe src={src} className="w-full h-full" />
					)}
				</div>
			</div>

			<div
				className="h-20 transition-all cursor-pointer m-4 mt-8 mb-0 hover:shadow-sm hover:scale-105 p-2 border rounded border-blue-100 bg-white hover:border-blue-400 group"
				onClick={() => setShowDemo(true)}
			>
				<div className="flex justify-center items-center relative">
					<>
						<Execution className="h-14 w-14 mr-4" />
						<div>
							<h3 className="text-xl">{title ?? "Live Demo"}</h3>
							<p className="text-gray-400 text-sm m-0">
								{message ?? "Click to see a live demo"}
							</p>
						</div>
						<a
							href={src}
							className="absolute top-0 right-0 p-2 bg-gray-100 hover:bg-gray-200 group-hover:visible invisible"
							onClick={(e) => e.stopPropagation()}
							target="_blank"
						>
							<OpenInWindow className="h-4 w-4" />
						</a>
					</>
				</div>
			</div>
		</>
	);
};
