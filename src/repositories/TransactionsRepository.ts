import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const income = Object.values(incomes).reduce(
      (acc, { value }) => acc + value,
      0,
    );

    const outcomes = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
    const outcome = Object.values(outcomes).reduce(
      (acc, { value }) => acc + value,
      0,
    );
    const total = income - outcome;
    this.balance = {
      income,
      outcome,
      total,
    };
    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}
export default TransactionsRepository;
