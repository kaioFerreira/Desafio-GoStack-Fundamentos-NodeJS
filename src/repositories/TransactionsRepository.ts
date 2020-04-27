import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let valueIncome = 0;
    let valueOutcome = 0;
    // eslint-disable-next-line array-callback-return
    this.transactions.map(obj => {
      const key = obj.type;

      if (key === 'income') {
        valueIncome += obj.value;
      } else {
        valueOutcome += obj.value;
      }
    });

    return {
      income: valueIncome,
      outcome: valueOutcome,
      total: valueIncome - valueOutcome,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
