import BalanceCard from '../components/dashboard/BalanceCard'
import IncomeCard from '../components/dashboard/IncomeCard'
import ExpenseCard from '../components/dashboard/ExpenseCard'
import CreditCardsWidget from '../components/dashboard/CreditCardsWidget'
import UpcomingExpensesWidget from '../components/dashboard/UpcomingExpensesWidget'
import ExpensesByCategoryCarousel from '../components/dashboard/ExpensesByCategoryCarousel'
import FinancialFlowChart from '../components/dashboard/FinancialFlowChart'
import TransactionsTable from '../components/dashboard/TransactionsTable'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import GoalsWidget from '../components/dashboard/GoalsWidget'
import PageContainer from '../components/layout/PageContainer'

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <PageContainer>
        <div className="space-y-10">
          <GoalsWidget />

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-400 mb-3">
              Resumo do mês
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <BalanceCard />
              <IncomeCard />
              <ExpenseCard />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FinancialFlowChart />
            <CreditCardsWidget />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExpensesByCategoryCarousel />
            <UpcomingExpensesWidget />
          </div>

          <TransactionsTable />
        </div>
      </PageContainer>
    </div>
  )
}
