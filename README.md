#### Invoice Generator

The Invoice Generator is a web application that allows users to create, view, and download invoices in PDF format. It also supports printing invoices directly from the browser. Built with React, this project is designed to be simple, user-friendly, and customizable.

### Features

Invoice Creation: Generate invoices with details such as store name, order ID, date, and itemized lists.
PDF Download: Download invoices as PDF files for offline use.
Print Functionality: Print invoices directly from the browser.
Tax Calculation: Automatically calculate taxes and totals for each invoice.
Responsive Design: Works seamlessly on both desktop and mobile devices.

### Technologies Used

Frontend: React, CSS
PDF Generation: jspdf, jspdf-autotable
Printing: react-to-print
Styling: CSS (or mention if you're using a framework like Tailwind or Bootstrap)

### Installation

Follow these steps to set up the project locally:
Clone the repository:

git clone <repository-url>
cd invoice-generator
Install dependencies

npm start
Open the application:
Visit http://localhost:3000 in your browser.

### Usage

Generating an Invoice
Fill in the store details, order ID, and date.
Add items to the invoice, including their name, quantity, regular price, and deal price.
The application will automatically calculate the tax and total amount.
Downloading a PDF
Click the Download PDF button to save the invoice as a PDF file.
Printing an Invoice
Click the Print Invoice button to print the invoice directly from the browser.

Tax Rate: Update the tax rate in the InvoiceDetail component.
Styling: Modify the CSS files to change the appearance of the application.
PDF Layout: Adjust the PDF generation logic in the handleDownloadPDF function.

### License

This project is for educational purposes only.

### Acknowledgments

React for the frontend framework.
jsPDF for PDF generation.
react-to-print for printing functionality.
