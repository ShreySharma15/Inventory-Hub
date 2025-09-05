import {
collection,
addDoc,
getDocs,
getDoc,
updateDoc,
deleteDoc,
doc,
serverTimestamp,
query,
orderBy,
onSnapshot,
} from "firebase/firestore";
import { db } from "./config";

// Single collection reference
const productsCol = collection(db, "products");

// Create
export const createProduct = async (product) => {
const payload = {
...product,
price: Number(product.price),
quantity: Number(product.quantity),
createdAt: serverTimestamp(),
updatedAt: serverTimestamp(),
};
const ref = await addDoc(productsCol, payload);
return { id: ref.id, ...payload };
};

// Read all
export const getAllProducts = async () => {
const q = query(productsCol, orderBy("name"));
const snap = await getDocs(q);
return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// Read one
export const getProductById = async (id) => {
const ref = doc(db, "products", id);
const snap = await getDoc(ref);
if (!snap.exists()) return null;
return { id: snap.id, ...snap.data() };
};

// Update
export const updateProductById = async (id, data) => {
const ref = doc(db, "products", id);
const payload = {
...data,
price: Number(data.price),
quantity: Number(data.quantity),
updatedAt: serverTimestamp(),
};
await updateDoc(ref, payload);
return { id, ...payload };
};

// Delete
export const deleteProductById = async (id) => {
const ref = doc(db, "products", id);
await deleteDoc(ref);
return id;
};

// Realtime subscription
export const subscribeProducts = (callback) => {
const q = query(productsCol, orderBy("name", "asc"));
const unsub = onSnapshot(q, (snap) => {
const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
callback(list);
});
return unsub;
};