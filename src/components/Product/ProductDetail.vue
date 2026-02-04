<template>
  <div class="modal fade" tabindex="-1" :id="`productDetailModal-${product.id}`">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title">{{ product.name }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="row g-4">
            <!-- Image -->
            <div class="col-md-6 text-center">
              <img
                :src="product.image || 'https://via.placeholder.com/400x400'"
                class="img-fluid rounded-3"
                style="max-height: 400px"
                alt="Product Image"
              />
            </div>

            <!-- Details -->
            <div class="col-md-6">
              <!-- Name -->
              <h2 class="text-success">{{ product.name }}</h2>

              <!-- Bestseller Badge -->
              <span v-if="product.isBestSeller" class="badge text-bg-warning p-2 me-2">
                <i class="bi bi-star-fill"></i> Bestseller
              </span>

              <!-- Category Badge -->
              <span class="badge text-bg-info p-2">
                <i class="bi bi-tag-fill me-1"></i> {{ product.category }}
              </span>

              <!-- Description -->
              <p class="text-muted mt-3">{{ product.description }}</p>

              <!-- Price -->
              <div class="h4 my-3">
                <template v-if="product.salePrice">
                  <span class="text-success me-2"> ${{ product.price.toFixed(0) }}/sqft </span>
                  <span class="text-danger">${{ product.salePrice.toFixed(0) }}/sqft</span>
                </template>
                <template v-else>
                  <span class="text-success">${{ product.price.toFixed(0) }}/sqft</span>
                </template>
              </div>

              <!-- Tags -->
              <div class="d-flex flex-wrap gap-2 mt-2">
                <span v-for="tag in product.tags" :key="tag" class="badge text-bg-secondary p-2">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <a href="mailto:hello@dotnetmastery.com" type="button" class="btn btn-primary"
            >Contact Us</a
          >

          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
})
</script>
