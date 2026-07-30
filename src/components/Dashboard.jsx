import React from "react";
import { Calendar, TrendingUp, CalendarDays, Wallet } from "lucide-react";

function Dashboard({
  totalExpense,
  dailyExpense,
  weeklyExpense,
  monthlyExpense,
}) {
  const cards = [
    {
      title: "today's Expenses",
      amount: dailyExpense,
      icon: <Calendar size={32} />,
      color: "bg-blue-500",
    },
    {
      title: "This Week",
      amount: weeklyExpense,
      icon: <TrendingUp size={32} />,
      color: "bg-green-500",
    },
    {
      title: "This Month",
      amount: monthlyExpense,
      icon: <CalendarDays size={32} />,
      color: "bg-orange-500",
    },
    {
      title: "Total Expense",
      amount: totalExpense,
      icon: <Wallet size={32} />,
      color: "bg-purple-500",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-3xl">{card.icon}</span>

            <div className={`w-3 h-3 rounded-full ${card.color}`}></div>
          </div>

          <h3 className="text-slate-500 text-sm mt-4">{card.title}</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">
            ₹ {card.amount}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
