function injectButton() {
  // Remove existing Genie AI button to avoid duplicates
  const existingButton = document.querySelector(".Genie-AI-Button");

  if (existingButton) {
    existingButton.remove();
  }

  // Try to find the Gmail compose toolbar
  const toolbar =
    document.querySelector(".btC") || document.querySelector(".aDh");

  if (!toolbar) {
    console.log("Toolbar not found");
    return;
  }

  // Create Genie AI button
  const button = document.createElement("button");

  button.textContent = "Genie AI ⭐";
  button.className = "Genie-AI-Button";

  button.style.marginLeft = "8px";
  button.style.padding = "6px 12px";
  button.style.backgroundColor = "#b0e546";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.borderRadius = "4px";
  button.style.cursor = "pointer";

  toolbar.appendChild(button);

  // Button click
  button.addEventListener("click", async () => {
    try {
      button.textContent = "Generating...";
      button.disabled = true;

      // Find Gmail compose/reply body
      const emailContent =
        document.querySelector('div[contenteditable="true"][role="textbox"]') ||
        document.querySelector(".Am.Al.editable.LW-avf.tS-tW");

      if (!emailContent) {
        throw new Error("Email compose body not found");
      }

      /*
       * Clone the compose body so we can clean it
       * without modifying the actual Gmail compose window.
       */
      const clonedContent = emailContent.cloneNode(true);

      // Remove quoted email, signatures, etc.
      const selectors = [
        ".h7",
        ".a3s.ail",
        ".gmail_quote",
        ".gmail_extra",
        ".gmail_signature",
        ".gmail_attr",
        '[role="presentation"]',
      ];

      selectors.forEach((selector) => {
        clonedContent
          .querySelectorAll(selector)
          .forEach((element) => element.remove());
      });

      const cleanedContent = clonedContent.innerText.trim();

      console.log("Cleaned Email Content:", cleanedContent);

      if (!cleanedContent) {
        throw new Error("No email content found");
      }

      // Call Spring Boot backend (Live Render Deployment)
      const response = await fetch("https://gmailgenie-ai.onrender.com/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: cleanedContent,
          tone: "professional",
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate email reply: ${response.status}`);
      }

      // Get generated reply from backend
      const generatedReply = await response.text();

      console.log("Generated Reply:", generatedReply);

      if (!generatedReply.trim()) {
        throw new Error("Backend returned an empty reply");
      }

      emailContent.innerText = generatedReply;

      emailContent.dispatchEvent(
        new InputEvent("input", {
          bubbles: true,
          inputType: "insertText",
          data: generatedReply,
        }),
      );

      console.log("AI reply inserted into Gmail successfully.");
    } catch (error) {
      console.error("Genie AI Error:", error);

      alert("Genie AI Error: " + error.message);
    } finally {
      button.textContent = "Genie AI ⭐";
      button.disabled = false;
    }
  });
}

// Detect Gmail compose window
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);

    const hasComposeElement = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches(".aDh, .btC") ||
          node.querySelector(".aDh, .btC") ||
          node.querySelector('div[role="dialog"]')),
    );

    if (hasComposeElement) {
      console.log("Compose Window Detected");

      setTimeout(injectButton, 500);
    }
  }
});

// Start observing Gmail
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
