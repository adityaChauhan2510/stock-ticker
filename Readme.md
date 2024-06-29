# **Stock Ticker App**
Welcome to the Stock Ticker App repository! This application displays real-time stock data using a React-based frontend, an Express server, and WebSocket for live updates. It follows a publisher-subscriber architecture utilizing Redis and is dockerized for easy deployment and scaling.

## Features
- Real-Time Stock Updates: Get live updates on stock prices without needing to refresh your browser.
- WebSocket Communication: Ensures that all connected clients receive stock updates instantly and simultaneously.
- Scalable Architecture: Utilizes Redis Pub/Sub mechanisms to scale across multiple instances if needed.
- Dockerized Environment: Ensures consistency across different environments and simplifies deployment processes.
- Hosted on AWS EC2: Robust and reliable hosting, allowing for high availability and scalability.

## Built With
- React - The web framework used
- Express - Backend server
- Redis - Handling pub/sub messaging
- WebSocket - Real-time communication
- Docker - Containerization
