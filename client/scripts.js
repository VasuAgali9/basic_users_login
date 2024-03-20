function openTab(tabName) {
    var i, tabContent;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
    document.getElementById(tabName + "-content").style.display = "block";
    if (tabName === 'submit') {
      // Load submit form
      fetch('submitForm.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('submit-content').innerHTML = data;
          document.getElementById('submit-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Serialize form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => formObject[key] = value);

            // Send form data to backend
            fetch('http://localhost:3000/api/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data saved successfully:', data);
                // Optionally, do something after successful form submission
            })
            .catch(error => {
                console.error('Error saving data:', error);
                // Optionally, handle errors
            });
          });
        });
    } else if (tabName === 'view') {
      // Load view data
      fetchAllData();
    }
  }
  
  // Fetch all user data and display
function fetchAllData() {
    fetch('http://localhost:3000/api/getAllData')
      .then(response => response.json())
      .then(data => displayData(data))
      .catch(error => console.error('Error:', error));
  }
 
  // Display data in table
  function displayData(data) {
    // Assuming there's a table with id 'user-table' in your HTML
    const table = document.getElementById('user-table');
    // Clear existing table data
    table.innerHTML = '';
  
    // Create table header row
    const headerRow = table.insertRow();
    for (const key in data[0]) {
      if (data[0].hasOwnProperty(key)) {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
      }
    }
  
    // Create table rows with user data
    data.forEach(user => {
      const row = table.insertRow();
      for (const key in user) {
        if (user.hasOwnProperty(key)) {
          const cell = row.insertCell();
          cell.textContent = user[key];
        }
      }
    });
  }
  // Fetch user data by name
function fetchByName(name) {
    fetch(`http://localhost:3000/api/getDataByName/${name}`)
      .then(response => response.json())
      .then(data => displayFilteredData(data))
      .catch(error => console.error('Error:', error));
  }
  
  // Fetch user data by DOB
  function fetchByDOB(dob) {
    fetch(`http://localhost:3000/api/getDataByDOB/${dob}`)
      .then(response => response.json())
      .then(data => displayFilteredData(data))
      .catch(error => console.error('Error:', error));
  }
  
  // Fetch user data by age
  function fetchByAge(age) {
    fetch(`http://localhost:3000/api/getDataByAge/${age}`)
      .then(response => response.json())
      .then(data => displayFilteredData(data))
      .catch(error => console.error('Error:', error));
  }
  
  // Display filtered data in table
  function displayFilteredData(data) {
    const table = document.getElementById('user-table');
    table.innerHTML = ''; // Clear existing table data
  
    // Create table header row
    const headerRow = table.insertRow();
    for (const key in data[0]) {
      if (data[0].hasOwnProperty(key)) {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
      }
    }
  
    // Create table rows with filtered user data
    data.forEach(user => {
      const row = table.insertRow();
      for (const key in user) {
        if (user.hasOwnProperty(key)) {
          const cell = row.insertCell();
          cell.textContent = user[key];
        }
      }
    });
  }
  
  // Function to filter data based on user input
  function filterData() {
    const filterType = document.getElementById('filter-type').value;
    const filterValue = document.getElementById('filter-value').value;
  
    if (filterType === 'name') {
      fetchByName(filterValue);
    } else if (filterType === 'dob') {
      fetchByDOB(filterValue);
    } else if (filterType === 'age') {
      fetchByAge(filterValue);
    }
  }
  
  
  
  