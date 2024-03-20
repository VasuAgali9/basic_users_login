function submitForm(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('submit-form'));
    const formObject = {};
    formData.forEach((value, key) => formObject[key] = value);
    
    // Call API to save data
    fetch('http://localhost:3000/api/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }
  