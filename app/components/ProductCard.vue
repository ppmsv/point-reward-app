<template>
  <div class="product-card" @click="$emit('click')">
    <img :src="product.image" alt="product image"/>
    <h3>{{ product.name }}</h3>
    <p>ลด {{ product.discount }} คะแนน: {{ product.point }} | หมดอายุ: {{ product.expiry }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ product: { name: string; image: string; discount: number; point: number; expiry: string } }>()
</script>

<style scoped lang="scss">
.product-card {
  width: 150px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  img {
    width: 100%;
    border-radius: 8px;
  }
}
</style>