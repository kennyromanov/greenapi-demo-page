# Green-API Demo Page

A technical assignment project to showcase my skills **integrating the page with the real APIs**.

The project followed the instructions from the PDF file I was given during the recruitment process.

## Quick Start

Open the page by right-clicking the [index.html](index.html) --> _"Open With"_ --> _"Chrome"_.

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

## Extras

During the progress I discovered that the `sendFileByUrl` method **did not work properly**. As I found out, the service did not respond properly to `.` (dots), which made impossible working with this specific endpoint. I marked that out in code and have saved the requests and responses from the server for further investigation: `/badSendFileByUrlRequest.curl`, `/badSendFileByUrlResponse1`, `/badSendFileByUrlResponse2.json`.   

---
Kenny R.
