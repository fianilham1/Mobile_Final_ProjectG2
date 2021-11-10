import SQLite from "react-native-sqlite-storage";

class SQLite3 {
    constructor() {
        // SQLite.DEBUG(true)
        SQLite.enablePromise(true)

        const database_name = "UserToken.db";
        const database_version = "1.0";
        const database_displayname = "SQLite RN Token Database";
        const database_size = 200000;

        this.conn = null
        SQLite.openDatabase(
            database_name, 
            database_version,
            database_displayname, 
            database_size)
            .then(tx => {
                this.conn = tx

                this.createTableToken(tx)
                // this.createTableChats(tx)

                // tx.executeSql('DROP TABLE tokens')                  
            })
            .catch(err => console.error("SQLite Error:", err))
    }

    createTableToken = (tx) => {
        tx.executeSql(`create table if not exists tokens(
            token TEXT,
            type TEXT)`)
            .then(() => {
                console.info("Successfuly create table token!")
            })
            .catch((err) => console.log('err create table token'))
    }

    insertToTableToken = (data) => {
        // INSERT INTO customer_details (customer_name,customer_address)
        // SELECT * FROM (SELECT 'Veronica' AS customer_name, '552 NewYork USA' AS customer_address) AS temp
        // WHERE NOT EXISTS (
        //     SELECT customer_name FROM customer_details WHERE customer_name = 'Veronica'
        // ) LIMIT 1;
        this.conn.transaction((tx) => {
            tx.executeSql(`INSERT INTO tokens (
                token,
                type
            )
            VALUES
                (
                    '${data.token}',
                    '${data.type}'
                )
                `
                )
            .then(() => console.info("Successfuly insert token!"))
            .catch(err => console.warn("Failed insert token!!", err))
            .finally(() => console.log("Finally insert!!"))
        }).catch((err) => {
          console.log('error transaction',err);
        });
    }

    getToken = () => {
        return new Promise((resolve) => {
            this.conn.transaction((tx) => {
                tx.executeSql('SELECT * FROM tokens LIMIT 1').then((results) => {
                  console.log("Query completed");
                  resolve(results[1].rows.item(0));
              }).catch((err) => {
                console.log('error executesql',err);
              });
            }).catch((err) => {
              console.log('error transaction',err);
            });
          });  
    }

    createTableChats = (tx) => {
        tx.executeSql(`create table if not exists chats_user1(
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT, 
            image TEXT,
            time TEXT,
            message TEXT,
            icon TEXT,
            messageType TEXT)`)
            .then(() => {
                console.log("finally")
                tx.executeSql(`INSERT INTO chats_user1 (
                    name,
                    image,
                    time,
                    message,
                    icon,
                    messageType
                )
                VALUES
                    ${CHATSDATA_USER1.map((data,index)=>{
                        return `(
                            '${data.name}',
                            '${data.image}',
                            '${data.time}',
                            '${data.message}',
                            '${data.icon}',
                            '${data.messageType}'
                        )`
                    })}
                    `
                    )
                .then(() => console.info("Successfuly insert chat user1!"))
                .catch(err => console.warn("Failed insert chat user1!!", err))
                .finally(() => console.log("Finally insert!!"))
            })
            .catch((err) => console.log('err table'))

            tx.executeSql(`create table if not exists chats_user2(
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT, 
                image TEXT,
                time TEXT,
                message TEXT,
                icon TEXT,
                messageType TEXT)`)
                .then(() => {
                    console.log("finally")
                    tx.executeSql(`INSERT INTO chats_user2 (
                        name,
                        image,
                        time,
                        message,
                        icon,
                        messageType
                    )
                    VALUES
                        ${CHATSDATA_USER2.map((data,index)=>{
                            return `(
                                '${data.name}',
                                '${data.image}',
                                '${data.time}',
                                '${data.message}',
                                '${data.icon}',
                                '${data.messageType}'
                            )`
                        })}
                        `
                        )
                    .then(() => console.info("Successfuly insert chat user2!"))
                    .catch(err => console.warn("Failed insert chat user2!!", err))
                    .finally(() => console.log("Finally insert!!"))
                })
                .catch((err) => console.log('err table'))
    }

   

    

    runQuery = (query, params = []) => this.conn.executeSql(query, params)
}

export default SQLite3