<script>
import ToolbarContent from "../components/toolbar.content.vue";
import SideBarContent from "../components/sideBar-content.vue";
import footerContent from "../../public/footer-content.vue";

export default {
  name: "dashboard-content",
  components: {
    ToolbarContent,
    sideBarContent: SideBarContent,
    footerContent: footerContent,
  }
}
</script>

<template>
  <div class="dashboard-wrapper">
    <ToolbarContent />

    <div class="main-layout">
      <side-bar-content />
      <main class="dashboard-content">
        <h1>Dashboard</h1>
        <div class="card-grid">
          <div class="card">
            <span>🌡</span>
            <p>IoT Sensor<br />C°</p>
          </div>
          <div class="card">
            <p><strong>Inventory Summary</strong></p>
            <p><u>Lorem ipsum</u><br /><u>Lorem ipsum</u></p>
          </div>
          <div class="card">
            <span>⚠️</span>
            <p>Alerts</p>
          </div>
          <div class="card">
            <p>__________<br />__________<br />__________</p>
          </div>
        </div>
      </main>
    </div>
    <footer-content/>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-layout {
  display: flex;
}

.dashboard-content {
  margin-left: 180px;
  margin-top: 60px;
  padding: 2rem;
  background-color: #fff;
  min-height: calc(100vh - 60px);
  overflow-y: auto;
  box-sizing: border-box;
}


.dashboard-content h1 {
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 240px);
  grid-gap: 2rem;
  justify-content: start;
  margin-top: 2.5rem;
}

.card {
  background-color: #ffa726;
  padding: 2rem 1.5rem;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  text-align: left;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 1.15rem;
  border: 2px solid #000;
}

.card span {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  display: block;
}
.card p {
  margin: 0;
  font-size: 1.15rem;
}
.card strong {
  font-size: 1.1rem;
}
.card u {
  color: #000;
  text-decoration-thickness: 2px;
}

</style>