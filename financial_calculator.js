class FinancialCalculator extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      this.shadowRoot.innerHTML = `
        <style>
          /* Основной стиль для центрирования компонента */
          :host {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f2f5;
          }
  
          .calculator {
            font-family: Arial, sans-serif;
            max-width: 320px;
            width: 100%;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            background-color: #ffffff;
            text-align: center;
          }
  
          h2 {
            font-size: 1.5em;
            color: #333;
            margin-bottom: 20px;
          }
  
          label {
            display: block;
            text-align: left;
            font-weight: bold;
            color: #555;
            margin-bottom: 5px;
          }
  
          input {
            width: 100%;
            padding: 12px;
            margin-bottom: 15px;
            border: 1px solid #d0d0d0;
            border-radius: 8px;
            font-size: 1em;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            box-sizing: border-box;
          }
  
          /* Стили для фокуса полей ввода */
          input:focus {
            border-color: #007bff;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
            outline: none;
          }
  
          .results {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #e0e0e0;
          }
  
          .results p {
            margin: 8px 0;
            font-size: 1em;
            color: #333;
          }
  
          .results span {
            font-weight: bold;
            color: #007bff;
          }
        </style>
  
        <div class="calculator">
          <h2>Финансовый Калькулятор</h2>
          <label>
            Сумма кредита:
            <input type="number" id="amount" placeholder="Введите сумму">
          </label>
          <label>
            Процентная ставка:
            <input type="number" id="rate" placeholder="Введите ставку (%)">
          </label>
          <label>
            Срок кредита (лет):
            <input type="number" id="term" placeholder="Введите срок">
          </label>
          <div class="results">
            <p>Ежемесячный платеж: <span id="monthlyPayment">0</span> руб.</p>
            <p>Общая сумма к оплате: <span id="totalPayment">0</span> руб.</p>
            <p>Общий процент по кредиту: <span id="totalInterest">0</span> руб.</p>
          </div>
        </div>
      `;
    }
  
    connectedCallback() {
      console.log('Компонент создан');
      this.shadowRoot.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', this.calculate.bind(this));
      });
    }
  
    disconnectedCallback() {
      console.log('Компонент удалён');
    }
  
    calculate() {
      const amount = parseFloat(this.shadowRoot.getElementById('amount').value) || 0;
      const rate = parseFloat(this.shadowRoot.getElementById('rate').value) || 0;
      const term = parseFloat(this.shadowRoot.getElementById('term').value) || 0;
  
      if (amount <= 0 || rate <= 0 || term <= 0) {
        this.updateResults(0, 0, 0);
        return;
      }
  
      const monthlyRate = rate / 100 / 12;
      const numberOfPayments = term * 12;
      const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
      const totalPayment = monthlyPayment * numberOfPayments;
      const totalInterest = totalPayment - amount;
  
      this.updateResults(monthlyPayment, totalPayment, totalInterest);
      console.log('Данные обновлены');
    }
  
    updateResults(monthlyPayment, totalPayment, totalInterest) {
      this.shadowRoot.getElementById('monthlyPayment').textContent = monthlyPayment.toFixed(2);
      this.shadowRoot.getElementById('totalPayment').textContent = totalPayment.toFixed(2);
      this.shadowRoot.getElementById('totalInterest').textContent = totalInterest.toFixed(2);
    }
  }
  
  customElements.define('financial-calculator', FinancialCalculator);
  