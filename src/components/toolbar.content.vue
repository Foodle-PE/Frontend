<script>
export default {
  name: "toolbar.content"
}
</script>

<template>
  <header class="toolbar">
    <div class="toolbar-left">
      <span class="icon-close">✕</span>
      <span class="toolbar-title"><em>GoodFood</em></span>
    </div>
    <div class="toolbar-center">
      <span class="toolbar-title"><strong>GoodFood</strong></span>
    </div>
  </header>
</template>


<style >
.toolbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #2da44e;
  color: black;
  border-bottom: 2px solid black;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  font-weight: bold;
  border-radius: 0 0 12px 12px;
  z-index: 1000;
  box-sizing: border-box;
}


.toolbar-left {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8px;
  padding-left: 1.5rem;
}
.toolbar-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.4rem;
}
.icon-close {
  font-size: 2rem;
  margin-right: 8px;
  cursor: pointer;
}
.toolbar-title {
  font-weight: bold;
}
</style>
