// 类查询
const calc = document.querySelector('.calc');
const keys = calc.querySelector('.calc_keys');
const display = calc.querySelector('.calc_display');
const calc_history = document.querySelector('.calc_history');
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
    // clear decimal calculate
    return action;
}

const initData = (state) => {
    state.firstValue = '';
    state.modValue = '';
    state.operator = '';
    state.previousKeyType = '';
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
    var cresult = '';
    var hresult = '';

    if (KeyType === 'number') {
        // 三元运算符
        cresult = displayedNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate' ?
            keyContent :
            displayedNum + keyContent;
        hresult = keyContent;

    }
    if (KeyType === 'decimal') {
        // 判断是否包含
        if (!displayedNum.includes('.')) {
            cresult = displayedNum + '.';
            hresult = '.';
        }
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
            cresult = '0.';
            hresult = cresult;
        } else {
            cresult = displayedNum;
            hresult = '';
        }
    }

    if (KeyType === 'operator') {
        // 且操作
        cresult = firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate' ?
            // ??           && previousKeyType !== 'clear'
            calculate(firstValue, operator, displayedNum) : displayedNum;
        hresult = keyContent;
        // way-1 update first value correctly
        //     calc.dataset.firstValue = calcValue;
        // } else {
        //     calc.dataset.firstValue = displayedNum;
        // }

        // way-2 remove const
        // displayedNum = display.textContent;

    }

    if (KeyType === 'clear') {
        cresult = 0;

        hresult = key.textContent === 'AC' ? '<br>' : "CE ";
    }

    if (KeyType === 'calculate') {
        cresult = firstValue ?
            // ??&& previousKeyType !== 'clear' && previousKeyType !== 'operator'
            previousKeyType === 'calculate' ?
            calculate(displayedNum, operator, modValue) :
            calculate(firstValue, operator, displayedNum) :
            displayedNum;
        hresult = keyContent + cresult + '<br>';
    }
    return [cresult, hresult]
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

    // origin author miss this
    if ((KeyType === 'number' || KeyType === 'decimal') &&
        previousKeyType === 'calculate') {
        initData(calc.dataset);
    }

    if (KeyType === 'clear' && key.textContent === 'AC') {
        initData(calc.dataset);
    }

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

const updateHistory = (result) => {
    calc_history.innerHTML = calc_history.innerHTML + result;
}

keys.addEventListener('click', e => {
    // 监听事件 条件匹配元素/类型/id/属性等
    if (!e.target.matches('button')) return
    const key = e.target;
    const displayedNum = display.textContent;
    const resultArr = getResult(key, displayedNum, calc.dataset);
    cal_result = resultArr[0];
    his_result = resultArr[1];
    display.textContent = cal_result;
    updateCalcState(key, calc, cal_result, displayedNum);
    updateVisualState(key, calc);
    updateHistory(his_result);
});