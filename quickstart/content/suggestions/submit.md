---
title: "Submit a New Suggestion"
description: "Fill out this form to share your suggestion."
---

<form name="improvement-suggestions" method="POST" data-netlify="true">
  <p>
    <label for="name">Your Name:</label><br/>
    <input type="text" name="name" id="name" required/>
  </p>
  <p>
    <label for="email">Your Email:</label><br/>
    <input type="email" name="email" id="email" required/>
  </p>
  <p>
    <label for="message">Your Suggestion:</label><br/>
    <textarea name="message" id="message" rows="5" required></textarea>
  </p>
  <button type="submit">Submit</button>
</form>
