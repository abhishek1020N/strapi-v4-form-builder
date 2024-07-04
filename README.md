<p align="center">
  <img src="./assets/logo.png" width="200" alt="Logo" />
</p>
<h1 align="center">Strapi Plugin Form Builder</h1>

## How to Install

Copy the following code and run from your terminal

```
yarn add strapi-v4-form-builder
```

```
npm i strapi-v4-form-builder
```

 - Add a new environment variable CSR_SECRET_KEY in your strapi project. This will be a random hash string.
 - .env file should be something like below with `CSR_SECRET_KEY` added.
```
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=dbName
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_SSL=false

CSR_SECRET_KEY="something#secret+123"
```

## Features Default

### Form Builder

- Create custom form fields from the Content Manager
- Use the Form-Type collection to defince the form fields and form structure
- Submissions can be viewed from the plugin's homepage.
- Based on each Form-Type its corresponding submissions can be viewed.
- Submitted attachments can be downloaded by CMS admin.

### Export

- Export data directly from the Content Manager
- Based on each Form-Type, all of its corresponding submissions can be exported to an excel file (.xlsx)

![Alt text](assets/form_type_create.png)

![Alt text](assets/submissions.png)

![Alt text](assets/submissions-detail.png)


<p align="center">
  <img width="100" src="/assets/tentwenty-logo.jpg" alt="Tentwenty.me">
</div>
