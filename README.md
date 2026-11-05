# EthioPay v2

EthioPay is a salary calculator that estimates net salary from gross salary and gross salary from net salary using Ethiopian income tax brackets and employee pension contributions.

## Features

- Gross-to-net salary calculation
- Net-to-gross salary calculation
- Income tax calculation
- 7% employee pension calculation
- View tax brackets
- Salary calculation history
- Input validation and error handling

## Technologies

- Node.js
- Express.js
- JavaScript
- HTML
- CSS

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ABHSKB/ethiopay-v2.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the required environment variables.

4. Start the server:

```bash
npm start
```

Open `http://localhost:3000` in your browser.

## API Endpoints

Base URL: `/api/salary`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/calculate` | Gross-to-net calculation |
| POST | `/net-to-gross` | Net-to-gross calculation |
| GET | `/brackets` | View tax brackets |
| GET | `/history` | View calculation history |
| GET | `/history/:id` | View a history record |
| DELETE | `/history/:id` | Delete a history record |
| DELETE | `/history` | Clear calculation history |

## Notes

- Salary history is stored in memory and resets when the server restarts.
- Tax calculations are estimates based on the configured tax brackets and pension assumptions.

## Author

**Hana Asrate**  
Software Engineering Student | Backend Development Learner