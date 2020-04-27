import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class BalanceTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(value: number, typo: string): Balance {
    const balance = this.transactionsRepository.getBalance();

    if (balance.outcome + value > balance.income && typo === 'outcome') {
      throw Error('Quebra de caixa');
    }

    return balance;
  }
}

export default BalanceTransactionService;
