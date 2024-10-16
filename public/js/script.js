document.getElementById('ruleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const ruleString = document.getElementById('rule').value;
  
    const response = await fetch('/api/rule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ruleString })
    });
  
    const data = await response.json();
    document.getElementById('result').innerText = JSON.stringify(data.ast, null, 2);
  });
  