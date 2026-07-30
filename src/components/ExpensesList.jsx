import { Pencil, Trash2, CalendarDays } from "lucide-react";

function ExpensesList({ expenses, deleteExpense, setEditingExpense }) {
  console.log("ExpensesList received:", expenses);
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        📋 Expense List
      </h2>

      {expenses.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          No expenses added yet.
        </div>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
            >
              {/* Top */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800">
                  {expense.title}
                </h3>

                <span className="text-xl font-bold text-indigo-600">
                  ₹{expense.amount}
                </span>
              </div>

              {/* Middle */}
              <div className="flex justify-between items-center mt-2">
                <span className="text-indigo-700 py-1 rounded-full text-sm">
                  {expense.category}
                </span>

                <span className="text-slate-500 text-sm">{expense.date}</span>
              </div>

              {/* Bottom */}
              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => setEditingExpense(expense)}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
                >
                  <Pencil size={18} />
                  Edit
                </button>

                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpensesList;
