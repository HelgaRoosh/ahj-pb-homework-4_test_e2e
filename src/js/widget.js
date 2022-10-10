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
        <h1>Credit Card Validator</h1>
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
            <input class="input" type="number" placeholder="Enter the card number">
            <button class="button" type="submit">validate</button>
          </div>
          <div class="result hidden">
            <span class="result_text hidden">карта существует?</span>
          </div>
        </form>
      </div>
    </div>
  </div>`;
  }

  bindToDOM() {
    this.parentEl.innerHTML = InnFormWidget.markup;

    this.element = this.parentEl.querySelector('.validator_body');
    this.submit = this.element.querySelector('.button');
    this.input = this.element.querySelector('.input');

    this.resultcont = this.element.querySelector('.result');
    this.result = this.element.querySelector('.result_text');

    this.submit.addEventListener('click', (e) => {
      e.preventDefault();
      this.onSubmit();
    });
  }

  onSubmit() {
    const { value } = this.input;
    if (isValidInn(value)) {
      this.showMessage('valid', 'invalid', 'card is valid');
    } else {
      this.showMessage('invalid', 'valid', 'card is not valid');
    }
  }

  showMessage(classAdd, classRemote, text) {
    this.resultcont.classList.add(classAdd);
    this.resultcont.classList.remove(classRemote);
    this.result.textContent = text;
    this.resultcont.classList.remove('hidden');
    this.result.classList.remove('hidden');
  }
}
