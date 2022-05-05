import { db, collectionf, queryf, wheref, getDocsf, addDocf, setDocf, docf, getDocf, deleteDocf, orderByf, limitf, updateDocf   } from '../../firebase/Firebase'

const DAO = () => {

    const createItem = async (collection, data, document = "0") => {
        return await new Promise(async (resolve, reject) => {
            try {
                console.log("DESDE EL DAO", collection, data, document);
                if (document === "0") await addDocf(collectionf(db, collection), data)
                else await setDocf(docf(db, collection, document.toString()),data);
                resolve(data);
            } catch (error) {
                reject({ error: error });
            }
        });
    };

    const readFirstTen = async (collection) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const itemsFB = await getDocf(docf(db, collection, "firstTen"));
                itemsFB.exists() ? resolve(itemsFB.data().items) : reject({ error: "Vacio" });
            } catch (error) {
                reject({ error: error });
            }
        });
    };

    const updateItem = async (collection, document, data) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const docRef = docf(db, collection, document.toString());
                await updateDocf(docRef, data);
                resolve(data);
            } catch (error) {
                reject({ error: error });
            }
        });
    }

    const deleteItem = async (collection, document) => {
        return await new Promise(async (resolve, reject) => {
            try {
                await deleteDocf(docf(db, collection, document.toString()));
                resolve({ resuelto: "Eliminado" });
            } catch (error) {
                reject({ error: error });
            }
        });
    };

    const getById = async (collection, document) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const res = await getDocf(docf(db, collection, document));
                delete res.IdNumerico;
                res.exists() ? resolve(res.data()) : resolve({ error: "Vacio" });
            } catch (error) {
                reject({ error: error });
            }
        });
    }

    const getAll = async (collection) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const querySnapshot = await getDocsf(collectionf(db, collection));
                if (!querySnapshot.empty) {
                    let newArr = [];
                    querySnapshot.forEach(doc => {
                        if(doc.id === "firstTen"){
                            doc.data().items.forEach(item => {
                                newArr.push(item);
                            });
                        }else newArr.push(doc.data());
                    });
                    resolve(newArr);
                } else resolve({ error: "Vacio" });
            } catch (error) {
                reject({ error: error });
            }
        });
    }

    const getWhere = async(collection, campo, comparacion, valor) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const q = queryf(collectionf(db, collection), wheref(campo, comparacion, valor));
                const querySnapshot = await getDocsf(q);
                if (!querySnapshot.empty) {
                    let newArr = [];
                    querySnapshot.forEach(doc => {
                        newArr.push(doc.data());
                    });
                    resolve(newArr.length === 1 ? newArr[0]: newArr);
                } else resolve({ error: "Vacio" });
            } catch (error) {
                reject({ error: error });
            }
        });
    }

    const getWhereWhere = async(collection, campo, comparacion, valor, campo2, comparacion2, valor2) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const q = queryf(collectionf(db, collection), wheref(campo, comparacion, valor), wheref(campo2, comparacion2, valor2));
                const querySnapshot = await getDocsf(q);
                if (!querySnapshot.empty) {
                    let newArr = [];
                    querySnapshot.forEach(doc => {
                        newArr.push(doc.data());
                    });
                    resolve(newArr.length === 1 ? newArr[0]: newArr);
                } else resolve({ error: "Vacio" });
            } catch (error) {
                reject({ error: error });
            }
        });
    }

    const getOrderByLimit = async(collection, campo, orden, limitNumber) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const q = queryf(collectionf(db, collection), orderByf(campo, orden), limitf(limitNumber));
                const querySnapshot = await getDocsf(q)
                if (!querySnapshot.empty) {
                    let newArr = [];
                    querySnapshot.forEach(doc => {
                        newArr.push(doc.data());
                    });
                    resolve(newArr.length === 1 ? newArr[0]: newArr);
                } else resolve({ Id: 0 });
            } catch (error) {
                reject({ error: error });
            }
        });
    }

    return {
        createItem, readFirstTen, updateItem, deleteItem, getById, getAll, getWhere, getOrderByLimit, getWhereWhere
    }
}

export default DAO
