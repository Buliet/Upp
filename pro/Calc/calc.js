// 类查询
const calc = document.querySelector('.calc');
const keys = calc.querySelector('.calc_keys');
const display = calc.querySelector('.calc_display');
const history = document.querySelector('.calc_history');
// 属性查询
const ClearButton = calc.querySelector('[data-action=clear]');

const calculate = (n1, operator, n2) => {
    // 转换成浮点数
    const fn1 = parseFloat(n1);
    const fn2 = parseFloat(n2);
    // 绝对相等
    if (operator === 'add') return fn1 + fn2;
    if (operator === 'minus') return fn1 - fn2;
    if (operator === 'multiply') return fn1 * fn2;
    if (operator === 'divide') return fn1 / fn2;
}

const getKeyType = (key) => {
    // 缩写 const action = key.dataset.action
    const { action } = key.dataset;
    // 否定操作
    if (!action) return 'number';
    // 或操作
    if (
        action === 'add' ||
        action === 'minus' ||
        action === 'multiply' ||
        action === 'divide'
    ) return 'operator';
    return action;

}
const getResult = (key, displayedNum, state) => {
    // .textContent 表示节点的文本内容
    const keyContent = key.textContent;
    const KeyType = getKeyType(key);
    // 赋值缩写
    const {
        firstValue,
        operator,
        modValue,
        previousKeyType
    } = state;

    if (KeyType === 'number') {
        // 三元运算符
        return displayedNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate' ||
            previousKeyType === 'clear' ?
            keyContent :
            displayedNum + keyContent;

    }
    if (KeyType === 'decimal') {
        // 判断是否包含
        if (!displayedNum.includes('.')) return displayedNum + '.';
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.';
        return displayedNum;

    }

    if (KeyType === 'operator') {
        // 且操作
        return firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate' &&
            previousKeyType !== 'clear' ?
            calculate(firstValue, operator, displayedNum) : displayedNum;
        // way-1 update first value correctly
        //     calc.dataset.firstValue = calcValue;
        // } else {
        //     calc.dataset.firstValue = displayedNum;
        // }

        // way-2 remove const
        // displayedNum = display.textContent;

    }

    if (KeyType === 'clear') return 0;

    if (KeyType === 'calculate') {
        return firstValue && previousKeyType !== 'clear' && previousKeyType !== 'operator' ?
            previousKeyType === 'calculate' ?
            calculate(displayedNum, operator, modValue) :
            calculate(firstValue, operator, displayedNum) :
            displayedNum
    }
}

const updateCalcState = (key, calc, calcValue, displayedNum) => {
    const KeyType = getKeyType(key);
    const {
        firstValue,
        operator,
        modValue,
        previousKeyType
    } = calc.dataset;
    calc.dataset.previousKeyType = KeyType;

    if (KeyType === 'operator') {
        calc.dataset.operator = key.dataset.action;
        calc.dataset.firstValue = firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate' ?
            calcValue :
            displayedNum
    }


    if (KeyType === 'calculate') {
        calc.dataset.modValue = firstValue && previousKeyType === 'calculate' ?
            modValue :
            displayedNum
    }
    if (KeyType === 'clear' && key.textContent === 'AC') {
        calc.dataset.firstValue = '';
        calc.dataset.modValue = '';
        calc.dataset.operator = '';
        calc.dataset.previousKeyType = '';

        history.innerHTML = history.innerHTML + '<br>';
    }
}

const updateVisualState = (key, calc) => {
    const KeyType = getKeyType(key);
    // 递归元素+class属性更新(移除)
    Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'));
    // class属性更新(添加)
    if (KeyType === 'operator') key.classList.add('is-depressed');

    if (KeyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC';
    if (KeyType !== 'clear') {
        ClearButton.textContent = 'CE';

    }
}

keys.addEventListener('click', e => {
    // 监听事件 条件匹配元素/类型/id/属性等
    if (!e.target.matches('button')) return
    const key = e.target;
    const displayedNum = display.textContent;
    const result = getResult(key, displayedNum, calc.dataset);
    display.textContent = result;
    updateCalcState(key, calc, result, displayedNum);

    history.innerHTML = history.innerHTML + key.textContent;
    updateVisualState(key, calc);
});