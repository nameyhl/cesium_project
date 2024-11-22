
//打开数据库
export const openDB = (dbName, storeName, version = 1) =>{
    return new Promise((resolve, reject) => {
        let indexDB = window.indexedDB
        let db
        let request = indexDB.open(dbName, version)
        request.onsuccess = (event) => {
            db = event.target.result//数据库对象
            resolve(db)
        }

        request.onerror = (event) => {
            reject(event)
        }

        request.onupgradeneeded = (event) => {
            //数据库创建或升级时会触发
            db = event.target.result//数据库对象
            let objectStore
            if(!db.objectStoreNames.contains(storeName)){
                objectStore = db.createObjectStore(storeName,{ keyPath :'id'})//创建表
            }
        }
    })
}

//新增数据
export const addData = (db, storeName, data) => {
    return new Promise((resolve, reject) => {
        let request = db.transaction([storeName], 'readwrite')//事务对象  指定表格名称和操模式
        .objectStore(storeName)//仓库对象
        .add(data)//添加数据
        
        //添加成功
        request.onsuccess = (event) => {
            resolve(event)
        }

        //添加失败
        request.onerror = (event) => {
            throw new Error(event.target.error)
            reject(event)
        }
    })
}

//通过组件查询数据
export const getDataById = (db, storeName, id) => {
    return new Promise((resolve, reject) => {
        let request = db.transaction([storeName])//事务
        .objectStore(storeName)//仓库
        .get(id)

        //查询成功
        request.onsuccess = (event) => {
            resolve(request.result)
        }

        //查询失败
        request.onerror = (event) => {
            reject(event)
        }
    })
}

//通过游标读取数据
export const cursorGetData = (db, storeName, id) => {
    let list = []
    let store = db.transaction(storeName,'readwrite').objectStore(storeName)
    let request = openCursor(store)
    return new Promise((resolve, reject) =>{
        request.onsuccess = (e) => {
            let cursor = e.target.result
            if(cursor){
                list.push(cursor.value)
                cursor.continue()
            }else{
                resolve(list)
            }
        }

        request.onerror = (event) => {
            reject(event)
        }
    })
}

//通过索引读取数据
export const getDataByIndex = (db, storeName, index) => {
    let store = db.transaction(storeName, 'readwrite').objectStore(storeName)
    let request = store.index(indexName).get(indexValue)
    return new Promise((resolve, reject) => {
        request.onerror = (event) => {
            reject(event)
        }

        request.onsuccess = (event) => {
            resolve(request.result)
        }
    })
}

//修改数据
export const updateData = (db, storeName, data) => {
    let request = db.transaction([storeName], 'readwrite').objectStore(storeName).put(data)
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            resolve(event)
        }

        request.onerror = (event) => {
            reject(event)
        }
    })
}

//删除数据
export const deleteData = (db, storeName, id) => {
    let request = db.transaction([storeName], 'readwrite').objectStore(storeName).delete(id)
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            resolve(event)
        }

        request.onerror = (event) => {
            reject(event)
        }
    })
}

//删除数据库
export const deleteDb = (dbName) => {
    let request = window.indexedDB.deleteDatabase(dbName)
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            resolve(event)
        }

        request.onerror = (event) => {
            reject(event)
        }
    })
}

//关闭数据库
export const closeDb = (db) => {
    db.close()
    console.log('数据库已关闭');
}

export default{
    openDB,
    addData,
    getDataById,
    cursorGetData,
    getDataByIndex,
    updateData,
    deleteData,
    deleteDb,
    closeDb
}