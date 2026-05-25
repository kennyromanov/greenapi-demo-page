# Green-API Demo Page

A technical assignment project to showcase my skills **integrating the page with the real APIs**.

The project followed the instructions from the PDF file I was given during the recruitment process.

## Quick Start

Open the page by right-clicking the `index.html` --> _"Open With"_ --> _"Chrome"_.

## Stack

- **Raw HTML:** as the foundation 
- **Pico CSS:** for better styling
- **Axios:** for the internal APIs
- **WhatsApp API Client:** to interact with the Green-API

## Structure

- `index.html`: the entry point
- `assets/`
  - `main.js`: the main JS file
  - `main.css`: the main CSS file
  - `errors.js`: the error helper
  - `api.js`: the API layer

## Additional

I found out that the parameter `phoneNumber` of _whatsapp-api-client-js_ is no longer supported, and its modern replacement is `chatId`. However, according to the manual **It is not so clear**, that `phoneNumber` should not be used. [I added deprecations directly to the library](https://github.com/green-api/whatsapp-api-client-js/pull/152), to make the library users know about these changes.

[!152](https://github.com/green-api/whatsapp-api-client-js/pull/152)

---
Kenny R.
