🛡️ AI-Powered Trust & Safety Platform for Marketplaces
Team: CrewX

📌 Project Description

This project addresses fraud and counterfeit activity in online marketplaces by combining machine learning, semantic analysis, and visual verification. The system also detects fake reviews, return fraud, and seller-based anomalies using a multi-model backend built entirely on serverless AWS infrastructure.

⚙️ How It Works

Real-time product data is ingested via DynamoDB Streams, processed by AWS Lambda, and streamed into Amazon S3 through Kinesis Firehose. Historical data is also ingested into S3 for batch use.

ETL and feature engineering are done using AWS Glue, and SageMaker Processing Jobs extract fraud signals through multiple models:

- CNNs for counterfeit image detection
- LLMs for review and product text analysis
- Tabular models for transactional and return fraud
- GNNs for fraud ring detection

Outputs from these models feed into a Seller Trust Score, computed via gradient boosting. These scores are exposed in the frontend via a report card.

[Demo Video] (https://drive.google.com/file/d/1vCcjMCyjGN9vh017PLAxXPaqrDRO6HSv/view?usp=sharing)

📊 Seller Report Card

Each seller is evaluated on:
- Trust Score (0–100)
- Return Fraud %
- Negative Review Trend %
- Counterfeit Risk Level (Low / Medium / High)
- Sellers with a Trust Score ≥ 75 are considered Authentic and shown with a verified badge.

🏗️ Architecture Highlights

- Ingestion: DynamoDB → Streams → Lambda → Kinesis → S3
- Processing: AWS Glue → S3 (processed)
- Models: CNN, LLM, Tabular, GNN, Multi-modal, Gradient Boosting (SageMaker)
- Inference: SageMaker Endpoint → Lambda → API Gateway
- Frontend: Web, Mobile, Services
- Monitoring: CloudWatch, QuickSight

✅ Features Demonstrated

- Counterfeit Product Detection (image & text-based)
- Fake Review Detection and Verification
- Seller Trust Score Calculation and Badging
- Return Fraud Detection
- Seller Report Card with Trust Metrics
- Real-time and Batch Fraud Monitoring

