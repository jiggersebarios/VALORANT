document.addEventListener("DOMContentLoaded", function () {
    // Fetch the assets.json file containing agent data
    let agentsData = [];

    fetch("assets.json")
        .then(response => response.json())
        .then(data => {
            agentsData = data.agents; // Access agents array from JSON
            console.log("Agent Data Loaded:", agentsData); 
        })
        .catch(error => console.error("Error loading JSON:", error));

    // Event listener for each button to display agents based on selected class
    document.querySelectorAll(".class-card button").forEach(button => {
        button.addEventListener("click", function () {
            const selectedClass = this.dataset.class; // Get the class from the button data
            const agentsList = document.getElementById("agents-list");
            agentsList.innerHTML = ""; // Clear the agents list before adding new agents
            
            // Filter agents based on their role
            const filteredAgents = agentsData.filter(agent => agent.role === selectedClass);

            filteredAgents.forEach(agent => {
                const agentDiv = document.createElement("div");
                agentDiv.classList.add("agent-card", "fade-in");
                agentDiv.innerHTML = `
                    <img src="${agent.image}" alt="${agent.name}">
                    <h4>${agent.name}</h4>
                `;
                agentsList.appendChild(agentDiv);
            });
        });
    });
});


function fetchAgent(agentName) {
  fetch('assets.json') // your JSON file
      .then(response => response.json())
      .then(data => {
          const agent = data.agents.find(a => a.name === agentName);
          if (!agent) return;

          // Set main agent info
          document.getElementById('agent-name').textContent = agent.name;
          document.getElementById('agent-role').textContent = "Role: " + agent.role;
          document.getElementById('agent-description').textContent = agent.description;
          document.getElementById('agent-full-img').src = agent.image;

          // Clear previous abilities
          const abilityIconsContainer = document.getElementById('ability-icons');
          const abilityDescContainer = document.getElementById('ability-description');
          abilityIconsContainer.innerHTML = '';
          abilityDescContainer.innerHTML = '<em>Click an ability icon to see its description.</em>';

          // Add ability icons
          agent.abilities.forEach((ability, index) => {
              const img = document.createElement('img');
              img.src = ability.image;
              img.alt = ability.name;
              img.title = ability.name;

              img.addEventListener('click', () => {
                  abilityDescContainer.innerHTML = `
                      <strong>${ability.name}</strong><br>
                      <p>${ability.description}</p>
                  `;
              });

              abilityIconsContainer.appendChild(img);
          });
      });
}
