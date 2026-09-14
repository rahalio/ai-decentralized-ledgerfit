# Ledgerfit — User stories

**Product:** [PRODUCT.md](./PRODUCT.md)


### Pharmacy network compliance officer

- As a pharmacy network compliance officer, I want surveillance models trained only on permissioned-ledger events from member sites, so that I can defend training data integrity if an admin or vendor is later accused of tampering.
- As a pharmacy network compliance officer, I want retrain and score cycles to fire from approved policy triggers, so that diversion monitoring does not depend on an analyst remembering to run a notebook.
- As a pharmacy network compliance officer, I want synthetic-data experiments clearly quarantined, so that Kaleido-style pilots cannot be mistaken for clinical evidence.

### Diversion investigator / clinical pharmacist

- As a diversion investigator, I want association rules that meet our support and confidence policy, so that I can prioritise co-prescription patterns (including gateway non-opioid hypotheses) for review.
- As a diversion investigator, I want identifiers masked by default on rule hits, so that curiosity browsing does not create unnecessary PHI exposure.
- As a diversion investigator, I want to open a dual-control reveal when a rule warrants casework, so that investigation can proceed without weakening everyday privacy.

### Pharmacy data steward

- As a pharmacy data steward, I want to publish prescription events or content hashes to the consortium ledger from our dispensing system, so that we participate without exporting mutable spreadsheets.
- As a pharmacy data steward, I want to freeze our site’s anchoring and scoring if we suspect a connector fault, so that bad data does not poison the network’s models.

### ML ops analyst

- As an ML ops analyst, I want to run Server-Layer batch jobs over a declared ledger window and Streaming-Layer incremental jobs on new events, so that I can choose heavy ARM rebuilds versus online updates by use case.
- As an ML ops analyst, I want every model artefact linked to the trigger and ledger range that produced it, so that unexplained drift has a forensic trail.

### Consortium governor / auditor

- As a consortium governor, I want to approve membership, threshold policies, and production promotion without issuing a token, so that governance stays institutional rather than speculative.
- As an external auditor, I want an export of provenance for models used in surveillance decisions, so that I can verify immutability and automation claims independently.
- As a consortium governor, I want a job rejected when the declared data source is not a registered permissioned ledger, so that mutable databases cannot be silently reintroduced.
