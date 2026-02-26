export default function ApplicationTimeline({ status }) {
  const steps = ["Applied", "Reviewed", "Accepted"];

  return (
    <div className="flex items-center gap-4 mt-4">
      {steps.map((step, index) => {
        const isCompleted =
          steps.indexOf(status) >= index &&
          status !== "Rejected";

        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full ${
                isCompleted
                  ? "bg-green-600"
                  : "bg-gray-300"
              }`}
            />

            <span
              className={`text-sm font-medium ${
                isCompleted
                  ? "text-green-700"
                  : "text-gray-500"
              }`}
            >
              {step}
            </span>

            {index !== steps.length - 1 && (
              <div className="w-8 h-0.5 bg-gray-300" />
            )}
          </div>
        );
      })}

      {status === "Rejected" && (
        <span className="ml-4 text-sm font-semibold text-red-600">
          ❌ Rejected
        </span>
      )}
    </div>
  );
}
