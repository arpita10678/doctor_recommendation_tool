document.getElementById('micButton').addEventListener('click', function() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.lang = 'en-US'; // Set language
    recognition.start();
  
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById('symptoms').value = transcript; // Fill input with recognized text
    };
  
    recognition.onerror = function(event) {
      console.error('Speech recognition error:', event.error);
    };
  });
  
  // Handle form submission
  document.getElementById('symptomForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const symptomsInput = document.getElementById('symptoms').value;
    const symptomsArray = symptomsInput.split(',').map(symptom => symptom.trim());
  
    fetch('http://localhost:3000/recommend-doctor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms: symptomsArray }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.recommendedSpecialization) {
        document.getElementById('specialization').textContent = data.recommendedSpecialization;
      } else {
        document.getElementById('specialization').textContent = 'No recommendation found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  