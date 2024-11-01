function StatsOfNumberOfUsers({
  icon,
  bgIconColor,
  userType,
  count,
  isLoading,
}) {
  return (
    <div
      className={`flex w-1/2 items-center gap-x-3 rounded-md bg-white py-5 pl-5 pr-24 shadow-lg`}
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: bgIconColor }}
      >
        {icon}
      </div>
      <div className="ml-2 flex h-2/3 flex-col justify-between border-l-2 border-l-primary-red pl-5">
        <span className="text-sm font-medium text-third-gray">{userType}</span>
        {isLoading ? (
          <span className="text-xs font-medium">Loading...</span>
        ) : (
          <span className="text-xl font-semibold">{count}</span>
        )}
      </div>
    </div>
  );
}

export default StatsOfNumberOfUsers;
