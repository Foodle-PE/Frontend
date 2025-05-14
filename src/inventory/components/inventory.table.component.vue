<script setup>
import { ref, onMounted } from 'vue';
import { getProducts, addProduct, deleteProduct } from '../services/productService';

const products = ref([]);
const showForm = ref(false);
const newProduct = ref({
  name: '',
  expirationDate: '',
  quantity: 0
});
const loadProducts = async () => {
  try {
    const response = await getProducts();
    products.value = response.data;
  } catch (error) {
    console.error('Error loading products:', error);
  }
};

const submitProduct = async () => {
  try {
    const response = await addProduct(newProduct.value);
    products.value.push(response.data);
    showForm.value = false;
    newProduct.value = { name: '', expirationDate: '', quantity: 0 };
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

const deleteProductById = async (id) => {
  try {
    await deleteProduct(id);
    products.value = products.value.filter(p => p.id !== id);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <div class="inventory-container">
    <h1>Inventory</h1>

    <table>
      <thead>
      <tr>
        <th>Product</th>
        <th>Expiration Date</th>
        <th>Quantity</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.expirationDate }}</td>
        <td>{{ product.quantity }}</td>
        <td><button @click="deleteProductById(product.id)">Delete</button></td>
      </tr>
      </tbody>
    </table>

    <button @click="showForm = !showForm">
      {{ showForm ? 'Cancel' : 'Add Product' }}
    </button>

    <div v-if="showForm" style="margin-top: 15px">
      <form @submit.prevent="submitProduct">
        <label>
          Name:
          <input type="text" v-model="newProduct.name" required />
        </label>
        <br />
        <label>
          Expiration Date:
          <input type="date" v-model="newProduct.expirationDate" required />
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" v-model="newProduct.quantity" required />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.inventory-container {
  padding: 20px;
}

h1 {
  color: #28a745;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
}

button {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #e68900;
}
</style>