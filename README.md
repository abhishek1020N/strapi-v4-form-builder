<p align="center">
  <img src="./logo.png" width="200" alt="Logo" />
</p>
<h1 align="center">Strapi Plugin Events Calendar</h1>

## How to Install

Copy the following code and run from your terminal

```
yarn add ab-strapi-calendar
```

```
npm i ab-strapi-calendar
```

## How to Use

In the schema file of a collection that is required to be mapped to calender view.

```
"options": {
      "draftAndPublish": true,
      "eventCalendarConfig": true
  },
```

Open the settings page and select the calendar settings.

Here you can select which collection and fields to use.
You can also customize the calendar style and options.
