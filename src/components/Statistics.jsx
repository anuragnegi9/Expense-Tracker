function Statistics({
  totalTransactions,
  highestExpense,
  lowestExpense,
  averageExpense,
  setExpenseFilter,
}) {
  const stats = [
    {
      title: "Total Transactions",
      value: totalTransactions,
      icon: "📋",
      color: "bg-blue-500",
      action: () => setExpenseFilter("all"),
    },
    {
      title: "Highest Expense",
      value: `₹ ${highestExpense}`,
      icon: "💰",
      color: "bg-green-500",
      action: () => setExpenseFilter("highest"),
    },
    {
      title: "Lowest Expense",
      value: `₹ ${lowestExpense}`,
      icon: "💸",
      color: "bg-red-500",
      action: () => setExpenseFilter("lowest"),
    },
    {
      title: "Average Expense",
      value: `₹ ${averageExpense}`,
      icon: "📊",
      color: "bg-purple-500",
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-800 mt-6 mb-6">
        📈 Statistics
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            onClick={() => {
              console.log("Clicked:", stat.title);
              stat.action?.();
            }}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl cursor-pointer transition duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="text-3xl">{stat.icon}</span>

              <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
            </div>

            <h3 className="text-sm text-slate-500 mt-4">{stat.title}</h3>

            <p className="text-3xl font-bold text-slate-800 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Statistics;
