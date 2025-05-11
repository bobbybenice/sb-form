# Form Submission Tool

[https://sb-form-bobbybenices-projects.vercel.app/](https://sb-form-bobbybenices-projects.vercel.app/)

This project is a **React-based form** submission tool with a **Next.js API system** that allows users to submit their contact details through a form. The form includes fields for first name, last name, email, and message, and submissions are sent via email using the Resend API. The tool also features robust form validation, ensuring that users provide all required information in a proper format.

## Getting Started

To get started with this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/bobbybenice/sb-form.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app in action.

## Features

- **Contact Form**: A form where users can submit their first name, last name, email, and message.
- **Form Validation**: Ensures all required fields are filled out, with specific validation for the email address format.
- **Email Notification**: Submissions are sent to a specified email address via the Resend API, allowing for real-time notifications.
- **Cross-Origin Request Handling**: Validates the origin of the form submission to ensure secure interaction with the server.

## Techniques Used

This project utilizes a variety of technologies and techniques to deliver a smooth user experience and efficient development process:

- **Next.js**: A React framework that enables server-side rendering, static site generation, and API routes.
- **React**: A JavaScript library for building user interfaces, utilized to create dynamic components.
- **Tailwind CSS**: A utility-first CSS framework that simplifies styling by using pre-defined classes for responsiveness and flexibility.
- **Framer Motion**: A library for creating animations and transitions in React applications, which adds smooth animations when interacting with elements.
- **TypeScript**: TypeScript enhances JavaScript with static typing, providing better code quality and reducing potential runtime errors.

- **Next.js API Routes**: Handles form submission logic and email sending on the server-side within the same codebase.
- **Resend API**: Used for sending email notifications when a form is successfully submitted.

## Contacts

- **Name**: Robert Pettersson
- **Email**: [pettersson.rob@gmail.com](mailto:pettersson.rob@gmail.com)
- **LinkedIn**: [https://www.linkedin.com/in/petterssonrob/](https://www.linkedin.com/in/petterssonrob/)
