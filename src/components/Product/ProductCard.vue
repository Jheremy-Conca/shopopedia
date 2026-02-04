<template>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card h-100 border">
      <!-- Image -->
      <div class="position-relative">
        <img
          :src="product.image || 'https://placehold.co/600x400'"
          class="card-img-top object-fit-cover"
          style="height: 200px"
          alt="Product"
        />

        <!-- Bestseller -->
        <div
          v-if="product.isBestSeller"
          class="position-absolute top-0 start-0 m-2 px-2 py-1 bg-success text-white rounded-pill small"
        >
          <i class="bi bi-star-fill me-1"></i>
          Bestseller
        </div>
      </div>

      <!-- Body -->
      <div class="card-body d-flex flex-column">
        <h5 class="card-title mb-2">
          {{ product.name }}
        </h5>

        <p class="card-text text-truncate mb-3">
          {{ product.description }}
        </p>

        <!-- Price & Action -->
        <div class="d-flex justify-content-between align-items-center mb-3 mt-auto">
          <div class="fw-bold fs-5">
            <template v-if="product.salePrice">
              <span
                class="text-success"
                :style="{ textDecoration: product.salePrice ? 'line-through' : 'none' }"
              >
                ${{ product.price.toFixed(0) }} / sqft
              </span>
              <span v-if="product.salePrice" class="px-2 text-danger"> SALE! </span>
            </template>

            <template v-else>
              <span>${{ product.price }} / sqft</span>
            </template>
          </div>

          <button
            class="btn btn-success btn-sm fs-6 py-2 px-4"
            data-bs-toggle="modal"
            :data-bs-target="`#productDetailModal-${product.id}`"
          >
            <i class="bi bi-card-list"></i>
            View Details
          </button>
        </div>

        <!-- Category & Tags -->
        <div class="d-flex flex-wrap gap-2">
          <span class="badge bg-secondary p-2">
            {{ product.category }}
          </span>

          <span v-for="tag in product.tags" :key="tag" class="badge bg-secondary p-2">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <ProductDetail :product="product" />
  </div>
</template>
<script setup>
import ProductDetail from './ProductDetail.vue'
const props = defineProps({
  product: Object,
})
</script>
