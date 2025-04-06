# **Fork & Find**

<p>Fork & Find is a modern web application designed to help users discover and provides detailed information about delicious food from a variety of restaurants. The application leverages a robust tech stack to deliver a seamless user experience.</p>

## Tech Stack
- **React**: A JavaScript library for building user interfaces, enabling the creation of reusable UI components.
- **TypeScript**: A superset of JavaScript that adds static typing, enhancing code quality and maintainability.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development, allowing for highly customizable and responsive designs.
- **Vite**: A next-generation frontend tooling for faster and leaner development experience.
- **Radix UI**: A set of low-level, accessible UI components for building high-quality design systems and web applications.
- **React Router**: A collection of navigational components that compose declaratively with your application.
- **Lucide Icons**: A set of beautiful and customizable icons for enhancing UI aesthetics.


the data is dirty, I have to use some functions like safeRender in FoodItemCard.tsx so clean it and then store it

only included categories which have more than 10000 products, assuming those are the most relevant.

optimized data fetching by selecting the necessary fields at the source end only, this improves performance and reduces latency

filtering the data recieving from the api, not showing the data which lacks basic information, such as barcode, product name, image,

