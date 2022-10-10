import isValidInn from './validator';

export default class InnFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onSubmit = this.onSubmit.bind(this);
  }

  static get markup() {
    return `<div class="validator_body">
    <div class="validator_content">
      <div class="validator_tittle">
        <h1>Проверка карты</h1>
      </div>
      <div class="validator_widget widget">
        <ul class="widget_list">
           <div class="widget_item">
             <li class="card visa"><span class="hidden">Visa</span></li>
           </div>
           <div class="widget_item">
             <li class="card mastercard"><span class="hidden">MasterCard</span>
             </li>
           </div>
           <div class="widget_item">
             <li class="card amex"><span class="hidden">American Express</span></li>
           </div>
           <div class="widget_item">
             <li class="card discover"><span class="hidden">Discover</span></li>
           </div>
           <div class="widget_item">
             <li class="card jcb"><span class="hidden">JCB</span></li>
           </div>
           <div class="widget_item">
             <li class="card diners"><span class="hidden">Dinners Club</span></li>
           </div>
           <div class="widget_item">
             <li class="card mir"><span class="hidden">МИР</span></li>
           </div>
         </ul>
        <form class="widget_form">
          <div class="widget_input">
            <input class="input" type="number" placeholder="Введите номер карты">
            <button class="button" type="submit">Далее</button>
          </div>
          <div class="result hidden">
            <p class="result_text">карта существует/не существует</p>
          </div>
        </form>
      </div>
    </div>
  </div>`;
  }

  static get submitSelector() { // кнопка с событием
    return '.button';
  }

  static get inputSelector() { // поле в котором читаем номер
    return '.input';
  }

  static get selector() { // элемент, который вставляем
    return '.validator_body';
  }

  static get resultSelector() { // поле в которое выводим результат
    return '.result_text';
  }

  bindToDOM() {
    this.parentEl.innerHTML = InnFormWidget.markup;

    this.element = this.parentEl.querySelector('.validator_body');
    this.submit = this.element.querySelector('.button');
    this.input = this.element.querySelector('.input');

    this.result = this.element.querySelector('.result_text');

    this.submit.addEventListener('click', this.onSubmit(this.result));
  }

  onSubmit(element) {
    const { value } = element;    

    if (isValidInn(value)) {
      this.result.classList.add('valid');
      // this.result.classList.remove('invalid');
      this.result.textContent = 'card is valid';
      this.result.classList.remove('hidden');
    } else {
      this.result.classList.add('invalid');
      // this.result.classList.remove('valid');
      this.result.textContent = 'card is not valid';
      this.result.classList.remove('hidden');
    }
  }
}
