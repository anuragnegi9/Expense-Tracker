import { useEffect, useState } from "react";
import { NotebookPen, IndianRupee, Tag, CalendarDays } from "lucide-react";

function ExpensesForm({
  expenses,
  setExpenses,
  editingExpense,
  setEditingExpense,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!title || !amount || !category || !date) {
    //   alert("Please fill all fields");
    //   return;
    // }

    if (editingExpense) {
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editingExpense.id
          ? {
              ...expense,
              title,
              amount: Number(amount),
              category,
              date,
            }
          : expense,
      );

      setExpenses(updatedExpenses);
      setEditingExpense(null);
    } else {
      const newExpense = {
        id: Date.now(),
        title,
        amount: Number(amount),
        category,
        date,
      };

      setExpenses([...expenses, newExpense]);
    }

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {editingExpense ? "✏️ Edit Expense" : "➕ Add New Expense"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className=" flex items-center gap-2 mb-2 font-medium text-slate-700">
            {" "}
            <NotebookPen size={18} />
            Title
          </label>

          <input
            type="text"
            placeholder="Enter expense title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="flex items-center gap-2 mb-2 font-medium text-slate-700">
            <IndianRupee size={18} />
            Amount
          </label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Category & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center gap-2 mb-2 font-medium text-slate-700">
              {" "}
              <Tag size={18} />
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="">Select Category</option>
              <option value="Food">🍕 Food</option>
              <option value="Travel">🚗 Travel</option>
              <option value="Shopping">🛍 Shopping</option>
              <option value="Bills">💡 Bills</option>
              <option value="Entertainment">🎬 Entertainment</option>
              <option value="Health">🏥 Health</option>
              <option value="Education">🚬 Cigarette</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 font-medium text-slate-700">
              {" "}
              <CalendarDays size={18} />
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300 cursor-pointer"
        >
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}

export default ExpensesForm;
