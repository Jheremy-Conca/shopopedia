<template>
  <div class="container">
    <div class="row border p-4 my-5 rounded">
      <div class="col-9">
        <form @submit.prevent="handleSubmit">
          <div class="h2 text-center text-success">
            {{ productIdForUpdate ? 'Update' : 'Create' }} Product
          </div>
          <hr />

          <!-- Errors -->
          <div v-if="errorList.length" class="alert alert-danger pb-0">
            Please fix the following errors:
            <ul>
              <li v-for="(error, index) in errorList" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>

          <!-- Name -->
          <div class="mt-3">
            <span class="text-muted">Name</span>
            <input type="text" v-model.trim="productObj.name" class="form-control" />
          </div>

          <!-- Description -->
          <div class="mt-3">
            <span class="text-muted">Description</span>
            <textarea v-model.trim="productObj.description" class="form-control"></textarea>
          </div>

          <!-- Price -->
          <div class="mt-3">
            <span class="text-muted">Price</span>
            <input type="number" v-model.number="productObj.price" class="form-control" />
          </div>

          <!-- Sale Price -->
          <div class="mt-3">
            <span class="text-muted">Sale Price</span>
            <input type="number" v-model.number="productObj.salePrice" class="form-control" />
          </div>

          <!-- Tags -->
          <div class="mt-3">
            <span class="text-muted">Tags (comma-separated)</span>
            <input
              type="text"
              class="form-control"
              v-model.trim="productObj.tags"
              placeholder="e.g., modern, classic, luxury"
            />
          </div>

          <!-- Best Seller -->
          <div class="form-check form-switch pt-3">
            <input
              class="form-check-input"
              v-model="productObj.isBestSeller"
              type="checkbox"
              role="switch"
              id="bestseller"
            />
            <label class="form-check-label" for="bestseller"> Best Seller </label>
          </div>

          <!-- Category -->
          <div class="mt-3">
            <label class="text-muted">Category</label>
            <select class="form-select" v-model="productObj.category">
              <option value="">Select category</option>
              <option v-for="option in PRODUCT_CATEGORIES" :value="option" :key="option">
                {{ option }}
              </option>
            </select>
          </div>

          <!-- Image -->
          <div class="mt-3">
            <label class="form-label">Image</label>
            <input
              type="file"
              class="form-control"
              @change="handleImageUpload"
              :disabled="isImageLoading"
            />
          </div>

          <!-- Buttons -->
          <div class="pt-3">
            <button class="btn btn-success m-2 w-25" :disabled="loading || isImageLoading">
              <span
                v-if="loading || isImageLoading"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              Submit
            </button>
            <router-link
              :to="{ name: APP_ROUTE_NAMES.PRODUCT_LIST }"
              class="btn btn-secondary m-2 w-25"
            >
              Cancel
            </router-link>
          </div>
        </form>
      </div>

      <!-- Preview -->
      <div class="col-3">
        <img
          :src="productObj.image"
          class="img-fluid w-100 m-3 p-3 rounded"
          alt="Product preview"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PRODUCT_CATEGORIES } from '@/constants/appConstants'
import { useSwal } from '@/composibles/useSwal'
import productService from '@/services/productService'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { uploadToCloudinary } from '@/utility/cloudinary'

const { showSuccess, showError, showConfirm } = useSwal()

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const isImageLoading = ref(false)
const errorList = reactive([])

const productObj = reactive({
  name: '',
  description: '',
  price: 0,
  salePrice: null,
  tags: '',
  isBestSeller: false,
  category: '',
  image: 'https://placehold.co/600x400',
})

const productIdForUpdate = route.params.id

// Load product for edit
onMounted(async () => {
  if (!productIdForUpdate) return

  loading.value = true
  try {
    const product = await productService.getProductById(productIdForUpdate)

    Object.assign(productObj, {
      ...product,
      tags: product.tags.join(', '),
    })
  } catch (error) {
    showError('Failed to load product')
    router.push({ name: APP_ROUTE_NAMES.PRODUCT_LIST })
  } finally {
    loading.value = false
  }
})

function handleImage(event) {
  const file = event.target.files[0]
  if (file) {
    productObj.image = URL.createObjectURL(file)
  }
}

async function handleSubmit() {
  errorList.length = 0

  // Validations
  if (productObj.name.length < 3) {
    errorList.push('Name should be at least 3 characters long.')
  }

  if (productObj.price <= 0) {
    errorList.push('Price should be greater than 0.')
  }

  if (productObj.salePrice && productObj.salePrice >= productObj.price) {
    errorList.push('Sale price must be lower than price.')
  }

  if (!productObj.category) {
    errorList.push('Please select a category.')
  }

  if (errorList.length) return

  const productData = {
    name: productObj.name,
    description: productObj.description,
    price: Number(productObj.price),
    salePrice: productObj.salePrice ? Number(productObj.salePrice) : null,
    tags: productObj.tags ? productObj.tags.split(',').map((tag) => tag.trim()) : [],
    isBestSeller: Boolean(productObj.isBestSeller),
    category: productObj.category,
    image: productObj.image,
  }

  loading.value = true

  try {
    if (productIdForUpdate) {
      const confirmResult = await showConfirm('Are you sure you want to update this product?')

      if (!confirmResult.isConfirmed) return

      await productService.updateProduct(productIdForUpdate, productData)

      showSuccess('Product updated successfully')
    } else {
      await productService.createProduct(productData)
      showSuccess('Product created successfully')
    }

    router.push({ name: APP_ROUTE_NAMES.PRODUCT_LIST })
  } catch (error) {
    showError('Something went wrong')
  } finally {
    loading.value = false
  }
}

async function handleImageUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  try {
    isImageLoading.value = true
    const imageUrl = await uploadToCloudinary(file)
    productObj.image = imageUrl
  } catch (e) {
    console.log(e)
    throw e
  } finally {
    isImageLoading.value = false
  }
}
</script>
