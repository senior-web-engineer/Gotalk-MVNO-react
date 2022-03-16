# GoTalk
### Table of contents
 ____
+ [Technologies used](#technologies-used)
+ [How to deploy a local project](#local-deployment)
+ [Routs](https://docs.google.com/document/d/1LiWUxF2_VadyMd9aiy9hLqtfKW6GKzfVdq6Lptl-vhk/edit?usp=sharing)


### Technologies used <a name="technologies-used"></a>
 ____
- NodeJS v14 +
- PostgreSQL

### How to deploy a local project<a name="local-deployment"></a>
 ____

1. Install dependencies:
```
npm install
```
2. Create a `.env` file. An example of the content of the file is in the file `example.env`
3. Execute migrations and seed commands
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
4. Launch of the project
```
npm run dev
```