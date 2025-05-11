<script>
export default {
  name: "sideBar-content"
}
</script>

<template>
  <aside class="sidebar">
    <ul>
      <li><span class="dot" /> <em>Dashboard</em></li>
      <li><span class="dot" /> <em>Inventory</em></li>
      <li><span class="dot" /> <em>Sensors</em></li>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  width: 180px;
  height: calc(100vh - 60px);
  background-color: #2da44e;
  border-right: 2px solid black;
  padding: 1rem;
  box-sizing: border-box;
  font-weight: bold;
  overflow-y: auto;
  color: black;
}



ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 1rem 0;
  display: flex;
  align-items: center;
}

.dot {
  height: 10px;
  width: 10px;
  background-color: orange;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.5rem;
}
</style>