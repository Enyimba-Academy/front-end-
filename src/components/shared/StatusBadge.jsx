export default function StatusBadge({ status }) {
  switch (status) {
    case "Active":
      return (
        <div className="bg-green-100 text-green-500 px-2 py-1 rounded-full  w-fit">
          Active
        </div>
      );
    case "Inactive":
      return (
        <div className="bg-red-500 text-red-50 px-2 py-1 rounded-full text-sm">
          Inactive
        </div>
      );
    default:
      return (
        <div className="bg-gray-500 text-gray-50 px-2 py-1 rounded-full text-sm">
          Unknown
        </div>
      );
  }
}
