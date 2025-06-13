AGENTS.md
Technologies
Backend

For the backend, I propose using Fastify due to its superior performance compared to Express. Fastify is a Node.js framework that offers high performance and has a very simple API, in addition to being extensible and modular. It also offers great validation and schema features, which will be useful for efficiently managing player transactions and data.

    Fastify: For the web server, providing high-performance routes and easy plugin integration. Ideal for RESTful APIs.
    Prisma ORM: For database interaction. Prisma is an excellent choice for working with relational databases, as it allows for intuitive data modeling and migrations.
    Redis: For caching transactions and game progression, ensuring that the item collection system and progress data are fast and scalable.

Frontend

For the frontend, I’ve chosen technologies that ensure high performance, scalability, and a great user experience. Considering it is an idle game, the interface needs to be responsive and smooth, without overloading the browser.

    Next.js: For the frontend framework, taking advantage of Static Site Generation (SSG) and Server-Side Rendering (SSR), which enhances game performance, especially on slower devices.
    React: For building interactive and dynamic interfaces, with state management done through React Query to simplify backend synchronization.
    Tailwind CSS: For design, ensuring a highly customizable and responsive UI, with low maintenance cost and high visual consistency.
    ShadCN: For modern and customizable interface components, which will ensure a good player experience without needing to build all components from scratch.
    Framer Motion: For smooth animations and transitions between screens, adding professionalism and dynamism to the game.

Linting and Formatting

    Biome: Biome will be used as the linter and code formatter to ensure consistency and maintain a clean, well-organized codebase.

Design Patterns

The architecture will be based on the following design patterns to ensure scalability and maintainability:

    Observer Pattern: Used to notify relevant systems when a game event occurs, such as item collection progress or player-to-player transactions.
    Singleton Pattern: Used to manage the player's session, ensuring that player data is stored and accessed uniquely.
    Factory Pattern: For dynamically creating items and monsters, allowing scalable configuration of new elements in the game.
    State Pattern: To manage the different states of the character, such as "idle", "in battle", or "progress", with transitions between states as the game progresses.
    Strategy Pattern: To apply different algorithms in the collection and battle process, adjusting game mechanics based on player choices.
    Command Pattern: For handling scheduled actions, such as automated tasks in idle mode, allowing the game to perform multiple actions without constant interaction.

Key Features

    Automatic Progress: The item collection system will be automated, based on time and actions performed by the player.
    Player-to-Player Transactions: Players will be able to trade items and resources, creating an in-game economy.
    Items: Items will be the main form of interaction between players. Although there will be no traditional upgrades, item trading will be key to progression.
    Battles and Dungeons: While the focus is on automatic progression, there will be battles against monsters in dungeons where players can collect items and rewards. This will add more dynamism to the game.
    Simple and Responsive Interface: Using Tailwind CSS and Framer Motion, the game will feature a simple, fluid interface with smooth transitions and a responsive layout.

Database Structure

The database will be organized into the following tables:

    Users: Storing information about players, such as progress, collected items, and transaction history.
    Items: Tables for different types of items (weapons, armor, potions, etc.).
    Transactions: To record and manage trades between players.
    Dungeons and Battles: Storing information about dungeons accessed, monsters defeated, and rewards earned.
    Events: To control game progress, such as "start battle", "collect item", etc.

Final Considerations
This project aims to create an engaging and fun experience for players, while exploring an economy based on items. The choice of technologies like Fastify, Next.js, React, Tailwind CSS, and Prisma will ensure a modern, scalable, and high-performance solution, while the adoption of well-established design patterns will provide a clean and maintainable architecture.
