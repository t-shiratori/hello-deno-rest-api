# hello-deno-rest-api
Practice Deno through simple web app with rest api.  
Used the following libraries.
- [oakserver/oak: A middleware framework for handling HTTP with Deno 🐿️ 🦕](https://github.com/oakserver/oak)
- [denodrivers/postgres: PostgreSQL driver for Deno](https://github.com/denodrivers/postgres)

## Setup
1. Prepare the database.  

[The Open Source Firebase Alternative | Supabase](https://supabase.com/)

2. Add .env file.  
```env
HOST_NAME=*** # Connection info Database Host
PASSWORD=***　# Connection info Password
PORT=*** # Connection info Port
```
<img width="800" alt="スクリーンショット 2022-08-14 12 20 43" src="https://user-images.githubusercontent.com/8470739/184521115-b855748f-ef5c-46b4-808e-9c1c676a45ae.png">

3. Install denon

[denosaurs/denon: 👀 Monitor any changes in your Deno application and automatically restart.](https://github.com/denosaurs/denon)

4. Install Velociraptor

[Velociraptor | The script runner for Deno](https://velociraptor.run/)

## Run it
```
$ vr server
```

Then, open browser to `http://0.0.0.0:8080/`.

