function getEmailContentToReply() {
  // 1. First, check if the user wrote anything in the compose/reply box itself (e.g. rough notes)
  const composeBox =
    document.querySelector('div[contenteditable="true"][role="textbox"]') ||
    document.querySelector(".Am.Al.editable.LW-avf.tS-tW");

  let draftText = "";
  if (composeBox) {
    const cloned = composeBox.cloneNode(true);
    // Remove signatures/quotes inside compose box
    const cleanSelectors = [".gmail_signature", ".gmail_quote", ".gmail_extra", ".h7"];
    cleanSelectors.forEach((sel) => {
      cloned.querySelectorAll(sel).forEach((el) => el.remove());
    });
    draftText = cloned.innerText.trim();
  }

  // If user typed some bullet points or draft notes, use that
  if (draftText && draftText.length > 5) {
    return draftText;
  }

  // 2. Otherwise, look for the received email thread being replied to in the active Gmail view
  const emailBodies = document.querySelectorAll(".a3s.aiL, .a3s.ail");
  if (emailBodies.length > 0) {
    // Get the latest incoming email message in the thread
    const latestEmail = emailBodies[emailBodies.length - 1];
    const emailClone = latestEmail.cloneNode(true);

    // Remove quotes and signatures from the incoming email
    const removeSelectors = [".gmail_quote", ".gmail_extra", ".gmail_signature", ".h7"];
    removeSelectors.forEach((sel) => {
      emailClone.querySelectorAll(sel).forEach((el) => el.remove());
    });

    const receivedText = emailClone.innerText.trim();
    if (receivedText) {
      return receivedText;
    }
  }

  // 3. Fallback: try reading the entire visible email thread text
  const messageBody = document.querySelector(".adn.ads") || document.querySelector(".ii.gt");
  if (messageBody) {
    const text = messageBody.innerText.trim();
    if (text) return text;
  }

  return draftText || "";
}

function injectButton() {
  const existingButton = document.querySelector(".Genie-AI-Button");
  if (existingButton) {
    return;
  }

  // Find the Gmail compose toolbar
  const toolbar =
    document.querySelector(".btC") || document.querySelector(".aDh");

  if (!toolbar) {
    return;
  }

  // Create Genie AI button
  const button = document.createElement("button");
  button.textContent = "Genie AI ⭐";
  button.className = "Genie-AI-Button";
  button.setAttribute("type", "button");

  toolbar.appendChild(button);

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      button.textContent = "Generating...";
      button.disabled = true;

      // Find Gmail compose editable box
      const composeBox =
        document.querySelector('div[contenteditable="true"][role="textbox"]') ||
        document.querySelector(".Am.Al.editable.LW-avf.tS-tW");

      if (!composeBox) {
        throw new Error("Compose box not found. Please open an email reply box.");
      }

      // Extract the email content to reply to
      const emailContent = getEmailContentToReply();

      console.log("Extracted Email Content for Genie AI:", emailContent);

      if (!emailContent) {
        throw new Error("Could not find email message to reply to. Please type some brief notes in the reply box.");
      }

      // Call Spring Boot backend (Live Render Deployment)
      const response = await fetch("https://gmailgenie-ai.onrender.com/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "professional",
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate email reply (Status: ${response.status})`);
      }

      const generatedReply = await response.text();

      if (!generatedReply || !generatedReply.trim()) {
        throw new Error("Backend returned an empty reply");
      }

      // Insert AI generated response into Gmail compose box
      composeBox.focus();
      composeBox.innerText = generatedReply;

      // Dispatch input event so Gmail detects and enables the Send button
      composeBox.dispatchEvent(
        new InputEvent("input", {
          bubbles: true,
          inputType: "insertText",
          data: generatedReply,
        })
      );

      console.log("AI reply successfully injected into Gmail.");
    } catch (error) {
      console.error("Genie AI Error:", error);
      alert("Genie AI: " + error.message);
    } finally {
      button.textContent = "Genie AI ⭐";
      button.disabled = false;
    }
  });
}

// Observe DOM mutations to detect when Compose or Reply is clicked
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);

    const hasComposeElement = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches(".aDh, .btC") ||
          node.querySelector(".aDh, .btC") ||
          node.querySelector('div[role="dialog"]'))
    );

    if (hasComposeElement) {
      setTimeout(injectButton, 400);
    }
  }
});

// Start observing Gmail
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
