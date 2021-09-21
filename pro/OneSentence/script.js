const sentence = document.getElementById('sentence');
const sentenceBtn = document.getElementById('sBtn');

sentenceBtn.addEventListener('click', generateSentence_A);

generateSentence_T();

// USING ASYNC/AWAIT
async function generateSentence_A() {
    const config = {
        method: 'GET',
    };

    const res = await fetch('https://v1.hitokoto.cn', config);

    const data = await res.json();

    sentence.innerText = data.hitokoto;
}

// USING .then()
function generateSentence_T() {
    const config = {
        method: 'GET',
    };

    fetch('https://v1.hitokoto.cn', config)
        .then((res) => res.json())
        .then((data) => {
            sentence.innerText = data.hitokoto
        });
}