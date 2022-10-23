import React, { useState } from "react";
import { Container, Button, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal"
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import TotalBudgetCard from "./components/TotalBudgetCard"
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./contexts/BudgetsContext";

export default function App() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
    const [viewExpenseModalBudgetId, setViewExpensesModalBudgetId] = useState()
    const [AddExpenseModalBudgetId, setsAddExpenseModalBudgetId] = useState()
    const { budgets, getBudgetExpenses } = useBudgets()

    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true)
        setsAddExpenseModalBudgetId(budgetId)
    }

    return (
        <>
            <Container className="my-4">
                <Stack direction="horizontal" gap="2" className="mb-4">
                    <h1 className="me-auto">Budgets</h1>
                    <Button variant="primary"
                        onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
                    <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
                </Stack>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(360px, 1fr))",
                    gap: "1rem",
                    alignItems: "flex-start"
                }}
                >
                    {budgets.map(budget => {
                        const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
                        return (
                            <BudgetCard
                                key={budget.id}
                                name={budget.name}
                                amount={amount}
                                max={budget.max}
                                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                            />
                        )
                    })}
                    <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
                        onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
                    <TotalBudgetCard />
                </div>
            </Container>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)} />
            <AddExpenseModal
                show={showAddExpenseModal}
                defaultBudgetId={AddExpenseModalBudgetId}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpensesModal
                budgetId={viewExpenseModalBudgetId}
                handleClose={() => setViewExpensesModalBudgetId()}
            />

        </>
    )
}