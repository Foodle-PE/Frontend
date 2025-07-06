<script setup>
import { ref, onMounted } from 'vue';
import { getProducts, addProduct } from '../services/productService';

const products = ref([]);
const showForm = ref(false);
const newProduct = ref({
  name: '',
  expirationDate: '',
  quantity: 0
});
const loading = ref(true);

const loadProducts = async () => {
  try {
    const response = await getProducts();
    console.log("Productos desde backend:", response.data);
    products.value = response.data;
  } catch (error) {
    console.error('Error loading products:', error);
  } finally {
    loading.value = false;
  }
};

const submitProduct = async () => {
  try {
    await addProduct(newProduct.value);
    await loadProducts(); // 👈 sincroniza con backend
    showForm.value = false;
    newProduct.value = { name: '', expirationDate: '', quantity: 0 };
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <div class="inventory-container">
    <h1>Inventory</h1>

    <button :class="{ 'cancel-button': showForm }" @click="showForm = !showForm">
      {{ showForm ? 'Cancel' : 'Add Product' }}
    </button>

    <div v-if="showForm" class="form-container">
      <form @submit.prevent="submitProduct">
        <label>
          Name:
          <input type="text" v-model="newProduct.name" required />
        </label>
        <label>
          Expiration Date:
          <input type="date" v-model="newProduct.expirationDate" required />
        </label>
        <label>
          Quantity:
          <input type="number" v-model="newProduct.quantity" required />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>

    <div v-if="loading">Loading products...</div>

    <div v-else-if="products.length === 0">
      <p>No products found. Please add some.</p>
    </div>

    <table v-else>
      <thead>
      <tr>
        <th>Product</th>
        <th>Expiration Date</th>
        <th>Quantity</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.expirationDate }}</td>
        <td>{{ product.quantity }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.inventory-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #28a745;
}

button {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  margin: 10px 0;
}

button:hover {
  background-color: #e68900;
}

.cancel-button {
  background-color: #dc3545;
}

.cancel-button:hover {
  background-color: #c82333;
}

.form-container {
  margin: 15px 0;
}

form label {
  display: block;
  margin-bottom: 10px;
}

input[type="text"],
input[type="date"],
input[type="number"] {
  padding: 5px;
  width: 200px;
  margin-left: 10px;
}

table {
  border-collapse: collapse;
  width: 100%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 15px;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>
