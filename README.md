
# Tactical Analyzer - Front-end


## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The app will reload automatically when you make changes.


# Tactical Analyzer - Backend


## Getting Started

### 1. Create an account at n8n.io (or install n8n through docker - to run locally in your machine)

visit n8n.io and create account for cloud based access

visit https://docs.n8n.io/hosting/installation/docker/ for locall installation of n8n

NOTICE: Watch this video for more details on how to install locally
https://youtu.be/TWZuctoZSFY?si=C1YQeDoqrQeOpWrG

### 2. Make an n8n Workflow

Visit https://docs.n8n.io/workflows/create/ for a guide of creating workflow


### 3. Import Workflow file

Visit https://docs.n8n.io/workflows/export-import/

>>> Import the workflow file "workflow_json_file.json" (found at /src/data/workflow_json_file.json) to check the backend workflow


### 4. Make secrets and API Keys (for Antrhopic, OpenAI, xAI, and/or DeepSeek)

Visit https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic/
Or https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/


### 5. Test the flow by Postman

Real Test data of Season 2019/2020 EPL Premier League found in /src/data/_LATEST_DATA_EPL_League_data.txt

Use postman to send test text test data to check the flow
