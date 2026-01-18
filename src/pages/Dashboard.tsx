import BalanceCard from '../components/dashboard/BalanceCard'
import IncomeCard from '../components/dashboard/IncomeCard'
import ExpenseCard from '../components/dashboard/ExpenseCard'
import CreditCardsWidget from '../components/dashboard/CreditCardsWidget'
import UpcomingExpensesWidget from '../components/dashboard/UpcomingExpensesWidget'
import TransactionsTable from '../components/dashboard/TransactionsTable'

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto lg:max-w-[1600px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="md:col-span-1">
          <BalanceCard />
        </div>
        <div className="md:col-span-1">
          <IncomeCard />
        </div>
        <div className="md:col-span-1">
          <ExpenseCard />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CreditCardsWidget />
        <UpcomingExpensesWidget />
      </div>

      <div className="mt-6">
        <TransactionsTable />
      </div>
    </div>
  )
}
