import { db } from '../utility/firebaseConfig'
import { collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

const productCollection = collection(db, 'products')

export default {
  // CREATE
  async createProduct(productData) {
    const docRef = await addDoc(productCollection, productData)
    return {
      id: docRef.id,
      ...productData,
    }
  },

  // READ ALL
  async getProducts() {
    const snapshot = await getDocs(productCollection)
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }))
  },

  // READ ONE
  async getProductById(id) {
    const productRef = doc(db, 'products', id)
    const snapshot = await getDoc(productRef)

    if (!snapshot.exists()) {
      throw new Error('Product not found')
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    }
  },

  // UPDATE
  async updateProduct(id, productData) {
    const productRef = doc(db, 'products', id)
    await updateDoc(productRef, productData)

    return {
      id,
      ...productData,
    }
  },

  // DELETE (opcional si luego lo necesitas)
  async deleteProduct(id) {
    const productRef = doc(db, 'products', id)
    await deleteDoc(productRef)
    return id
  },
}
