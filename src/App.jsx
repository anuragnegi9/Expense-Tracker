import { useState, useEffect } from "react";
import ExpensesForm from "./components/ExpensesForm";
import ExpensesList from "./components/ExpensesList";
import Dashboard from "./components/Dashboard";
import Charts from "./components/Charts";
import Statistics from "./components/Statistics";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");

    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortBy, setSortBy] = useState("newest");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [expenseFilter, setExpenseFilter] = useState("all");

  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expenses) => expenses.id !== id));
  };

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  const today = new Date().toISOString().split("T")[0];

  const dailyExpense = expenses
    .filter((expense) => expense.date === today)
    .reduce((total, expense) => total + expense.amount, 0);

  // const todayExpenses = expenses.filter((expense) => expense.date === today);

  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const weeklyExpense = expenses
    .filter((expense) => new Date(expense.date) >= sevenDaysAgo)
    .reduce((total, expenses) => total + expenses.amount, 0);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpense = expenses
    .filter((expense) => {
      const d = new Date(expense.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((total, expense) => total + expense.amount, 0);

  const groupExpenses = {};

  expenses.forEach((expense) => {
    if (groupExpenses[expense.date]) {
      groupExpenses[expense.date] += expense.amount;
    } else {
      groupExpenses[expense.date] = expense.amount;
    }
  });

  const chartData = Object.keys(groupExpenses).map((date) => ({
    date,
    expense: groupExpenses[date],
  }));

  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  const pieData = Object.keys(categoryTotals)
    .filter((category) => category && categoryTotals[category] > 0)
    .map((category) => ({
      category,
      amount: categoryTotals[category],
    }));

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || expense.category === selectedCategory;

    const matchesFromDate = !fromDate || expense.date >= fromDate;

    const matchesToDate = !toDate || expense.date <= toDate;

    return matchesSearch && matchesCategory && matchesFromDate && matchesToDate;
  });

  const sortedExpenses = [...filteredExpenses];

  const totalTransactions = expenses.length;

  const highestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((expense) => expense.amount))
      : 0;

  const lowestExpense =
    expenses.length > 0
      ? Math.min(...expenses.map((expense) => expense.amount))
      : 0;

  const averageExpense =
    expenses.length > 0 ? Math.round(totalExpense / expenses.length) : 0;

  sortedExpenses.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);

      case "oldest":
        return new Date(a.date) - new Date(b.date);

      case "highest":
        return b.amount - a.amount;

      case "lowest":
        return a.amount - b.amount;

      case "az":
        return a.title.localeCompare(b.title);

      case "za":
        return b.title.localeCompare(a.title);

      default:
        return 0;
    }
  });

  let displayedExpenses = [...sortedExpenses];

  if (expenseFilter === "highest") {
    const maxAmount = Math.max(
      ...displayedExpenses.map((expense) => Number(expense.amount)),
    );
    displayedExpenses = displayedExpenses.filter(
      (expense) => Number(expense.amount) === maxAmount,
    );
  }

  if (expenseFilter === "lowest") {
    const minAmount = Math.min(
      ...displayedExpenses.map((expense) => Number(expense.amount)),
    );
    displayedExpenses = displayedExpenses.filter(
      (expense) => Number(expense.amount) === minAmount,
    );
  }
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-10">
          Expense Tracker
        </h1>

        {/* Dashboard */}

        <Dashboard
          totalExpense={totalExpense}
          dailyExpense={dailyExpense}
          weeklyExpense={weeklyExpense}
          monthlyExpense={monthlyExpense}
        />

        {/*Statistics*/}
        <Statistics
          totalTransactions={totalTransactions}
          highestExpense={highestExpense}
          lowestExpense={lowestExpense}
          averageExpense={averageExpense}
          setExpenseFilter={setExpenseFilter}
        />

        {/* Charts*/}
        <div className="mt-10">
          <Charts chartData={chartData} pieData={pieData} />
        </div>

        <div>
          {/* Search*/}
          <input
            type="text"
            placeholder="🔍 Search Expenses"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-slate-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 mt-8 mb-6 "
          />
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-slate-400 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Cigarette</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="newest">🆕 Newest First</option>
          <option value="oldest">📅 Oldest First</option>
          <option value="highest">💰 Highest Amount</option>
          <option value="lowest">💸 Lowest Amount</option>
          <option value="az">🔤 A → Z</option>
          <option value="za">🔡 Z → A</option>
        </select>

        {/*Date Range Filter*/}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              From Date
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              To Date
            </label>

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setSortBy("newest");
              setFromDate("");
              setToDate("");
              setExpenseFilter("all");
            }}
            className="mt-4  bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-xl transition"
          >
            Clear All Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          {/* Expenses Form*/}
          <ExpensesForm
            expenses={expenses}
            setExpenses={setExpenses}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />

          {/* Expenses List*/}

          <ExpensesList
            expenses={displayedExpenses}
            deleteExpense={deleteExpense}
            setEditingExpense={setEditingExpense}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
