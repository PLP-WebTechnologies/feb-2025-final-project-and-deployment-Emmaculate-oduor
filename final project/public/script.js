
async function loadProjects() {
    try {
        const response = await fetch("/api/projects"); 
        const projects = await response.json();
        const projectList = document.getElementById("projects-list");

        projectList.innerHTML = projects.map(proj => `
            <div>
                <h3>${proj.title}</h3>
                <p>${proj.description}</p>
                <a href="${proj.github_link}" target="_blank">GitHub</a>
                ${proj.live_demo_link ? `<a href="${proj.live_demo_link}" target="_blank">Live Demo</a>` : ""}
            </div>
        `).join("");
        
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
}

// Handle contact form submission
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("contactForm").addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        console.log("Submitting form data:", { name, email, message });

        try {
            const response = await fetch("http://localhost:8080/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message })
            });

            console.log("Response status:", response.status);

            const result = await response.json();
            console.log("Response from server:", result);

           
            if (response.ok) {
                alert("Message sent successfully!"); 
                form.reset(); 
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting contact form:", error);
        }
    });
 });
