document.addEventListener("DOMContentLoaded", function () {
    const agentsData = {
        Controller: ["Brimstone", "Omen", "Viper", "Astra", "Harbor"],
        Duelist: ["Jett", "Phoenix", "Reyna", "Raze", "Neon", "Yoru"],
        Initiator: ["Breach", "Skye", "Sova", "KAYO", "Fade", "Gekko"],
        Sentinel: ["Sage", "Cypher", "Killjoy", "Chamber"],
    };

    let agentImages = {};

   
    fetch("agent.json")
        .then(response => response.json())
        .then(data => {
            agentImages = data; 
            console.log("Agent Images Loaded:", agentImages); 
        })
        .catch(error => console.error("Error loading JSON:", error));

    document.querySelectorAll(".class-card button").forEach(button => {
        button.addEventListener("click", function () {
            const selectedClass = this.querySelector("h3").textContent;
            const agentsList = document.getElementById("agents-list");
            agentsList.innerHTML = ""; 
            
            if (agentsData[selectedClass]) {
                agentsData[selectedClass].forEach(agent => {
                    if (agentImages[agent]) { // Ensure image exists
                        const agentDiv = document.createElement("div");
                        agentDiv.classList.add("agent-card", "fade-in");
                        agentDiv.innerHTML = `
                            <img src="${agentImages[agent]}" alt="${agent}">
                            <h4>${agent}</h4>
                        `;
                        agentsList.appendChild(agentDiv);
                    } else {
                        console.warn(`Image for ${agent} not found in JSON.`);
                    }
                });
            }
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
