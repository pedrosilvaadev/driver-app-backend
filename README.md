<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# URIDE Driver App Backend

This project is the backend for the Driver App MVP, built with **NestJS**, **Prisma**, and **JWT Auth**. It implements driver authentication, ride management, status updates in real time via WebSocket.

---

## Table of Contents

- [Overview](#overview)
- [Main Features](#main-features)
- [Data Models](#data-models)
- [Key Endpoints](#key-endpoints)
- [WebSocket](#websocket)
- [Testing](#testing)
- [How to Run Locally](#how-to-run-locally)
- [Possible Improvements](#possible-improvements)
- [Design Decisions](#design-decisions)

---

## Overview

The backend allows drivers to sign up, log in, view available ride requests, accept a ride, and update its status. Passengers can track the status of their ride in real time.

---

## Main Features

- **Driver Authentication** (`/auth/signup`, `/auth/login`)
- **List Available Rides** (`/rides`)
- **Ride Details** (`/rides/:id`)
- **Accept Ride** (`/rides/:id/accept`)
- **Update Ride Status** (`/rides/:id/status`)
- **Real-time Updates** via WebSocket (gateway)

---

## Data Models

### Driver

| Field            | Type   | Description                        |
| ---------------- | ------ | ---------------------------------- |
| id               | int    | Driver identifier                  |
| name             | string | Name                               |
| email            | string | Email                              |
| password         | string | Password (hashed)                  |
| current_location | object | { lat: number, lng: number }       |
| status           | string | 'online' \| 'offline' \| 'on-trip' |
| rating           | number | Driver rating                      |
| total_trips      | number | Total completed trips              |

### Ride

| Field           | Type   | Description                                                  |
| --------------- | ------ | ------------------------------------------------------------ |
| id              | int    | Ride identifier                                              |
| driver_id       | int    | Driver (null until accepted)                                 |
| passenger_id    | int    | Passenger                                                    |
| status          | string | 'available' \| 'in_progress' \| 'picked_up' \| 'dropped_off' |
| pickup_lat/lng  | number | Pickup location                                              |
| pickup_address  | string | Pickup address                                               |
| dropoff_lat/lng | number | Dropoff location                                             |
| dropoff_address | string | Dropoff address                                              |

### Passenger

| Field | Type   | Description          |
| ----- | ------ | -------------------- |
| id    | int    | Passenger identifier |
| name  | string | Passenger name       |

---

## Key Endpoints

### Auth

- `POST /auth/signup`  
  Register a new driver.

- `POST /auth/login`  
  Returns a JWT for authentication.

### Rides

- `GET /rides`  
  List available rides.

- `GET /rides/:id`  
  Get ride details.

- `PATCH /rides/:id/accept`  
  Authenticated driver accepts a ride.

- `PUT /rides/:id/status`  
  Authenticated driver updates ride status (`picked_up`, `dropped_off`).

> **Note:** All ride endpoints require JWT authentication.

---

## WebSocket

The backend uses a gateway (`rides.gateway.ts`) to send real-time events:

- When a ride is accepted, all clients receive an event.
- When a ride status changes, all clients receive an event.

---

## Testing

- **Unit tests:** Cover main use cases.
- **E2E tests:** Test the full flow of authentication, accepting, and updating rides.
- **Test Database:** Uses a separate database for e2e tests.

---

## How to Run Locally

1. **Clone the repository**
2. **Configure the database**  
   Edit `.env` and `.env.test` with your database URLs.
3. **Run migrations**
   ```bash
   npx prisma migrate deploy
   ```
4. **Install dependencies**
   ```bash
   npm install
   ```
5. **Start the server**
   ```bash
   npm run start:dev
   ```
6. **Run tests**
   ```bash
   npm run test
   npm run test:e2e
   ```

---

## Possible Improvements

- **Passenger Creation:**  
  Endpoint to register new passengers.

- **Ride Creation:**  
  Endpoint for passengers to request new rides.

- **Ride Cancellation:**  
  Allow drivers or passengers to cancel a ride.

- **Ride History:**  
  List past rides for drivers and passengers.

- **Filtering and Pagination:**  
  Improve ride listing with filters and pagination.

- **Push Notifications:**  
  Notify drivers and passengers of ride updates.

- **Location Validation:**  
  Validate driver's proximity to passenger.

- **Test Coverage:**  
  Increase unit and e2e test coverage.

- **Swagger Documentation:**  
  Generate automatic API documentation.

- **Better Concurrency Control:**  
  Ensure atomicity when accepting rides (avoid race conditions).

---

## Design Decisions

- **JWT Auth:**  
  The `driver_id` is extracted from the JWT, ensuring secure and simple controller logic.

- **Prisma ORM:**  
  Simplifies data access and manipulation.

- **Clean Architecture:**  
  Use cases are decoupled from controllers and repositories.

- **WebSocket:**  
  Real-time updates for all connected clients.

- **Testing:**  
  Clear separation between unit and e2e tests, with a dedicated test database.

---
